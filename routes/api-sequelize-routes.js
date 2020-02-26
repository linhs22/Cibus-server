var db = require("../SequelizeModels");
const bcrypt = require("bcrypt");
const { format } = require('util');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { predictImage } = require("../API/clarifai-api");
const Op = db.Sequelize.Op;

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

// // Instantiate a storage client
const storage = new Storage();
// // A bucket is a container for objects (files).
const bucketFood = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_FOOD);
const bucketProfile = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_PROFILE);


module.exports = function (app) {

    //Route to check if user exist
    app.get("/api/auth/:username", (req, res) => {
        console.log(req.params.username);
        db.User.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });

    // Login
    app.post("/api/auth/login", (req, res) => {
        db.User.findOne({
          where: {
            name: req.body.name
          }
        }).then(dbUser=>{
          if(bcrypt.compareSync(req.body.password,dbUser.password)){
            req.session.user={
              id:dbUser.id,
              name:dbUser.name
            }
            res.json(req.session.user)
          }
          else{
            res.status(401).json("not logged in")
          }
        })
      })

    // Route to delete users
    app.delete("/api/auth/:username", (req, res) => {
        console.log("Deleted " + req.params.username);
        db.User.destroy({
            where: {
                username: req.params.username
            }
        })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });

    // Route to create a profile
    app.post("/api/auth/signup", multer.single('image'), (req, res, next) => {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        // Create a new blob in the bucket and upload the file data.
        const fileExt = req.file.mimetype.split("/")[1];
        const blobProfile = bucketProfile.file(req.body.username + "." + fileExt);
        const blobStream = blobProfile.createWriteStream({
            resumable: false,
        });

        blobStream.on('error', err => {
            next(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucketProfile.name}/${blobProfile.name}`
            );
            req.body.profilePic = publicUrl;
            db.User.create(req.body)
                .then(userData => {
                    res.json(userData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400);
                    res.json(err);
                });
        });

        blobStream.end(req.file.buffer);
    });

    app.get('/api/auth/loggedinuser',(req,res)=>{
        if(req.session.user){
          res.json(req.session.user)
        } else {
          res.status(401).json("not logged in")
        }
      })

    // Route to get all posts from user
    app.get("/api/posts/:userid/:number", (req, res) => {
        db.Post.findAll({
            where: {
                UserId: req.params.userid
            },
            limit: parseInt(req.params.number),
            order: [['createdAt', 'DESC']],
            include: [{ model: db.User }]
        })
            .then(posts => {
                res.json(posts)
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });

    app.get("/api/myposts/:userid", (req, res) => {
        db.Post.findAll({
            where: {
                UserId: req.params.userid
            },
            order: [['createdAt', 'DESC']],
            include: [{model: db.Comment}]
        })
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(err);
        });
    });

    //Populate homepage
    app.get("/api/followers/:userid/:offset", (req, res) => {
        db.User.findOne({
            where:{
                id: parseInt(req.params.userid)
            },include:[
                // db.Post,
                {
                    model:db.User,
                    as:"Follower"
                }
            ]
        })
        .then(results => {
            var followersArray = results.Follower.map(result => result.dataValues.id);
            db.Post.findAll({
                offset: parseInt(req.params.offset),
                limit: 2,
                where: {
                    UserId: followersArray
                },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.User }, { model: db.Comment,
                include: [{model: db.User}] 
            }]
            })
                .then(results => {
                    res.json(results);
                })
                .catch(err => {
                    res.status(400).send(err);
                })
        })
        .catch(err => {
            res.status(400).send(err);
        })
    });

    
    app.get("/searchpost/:search/:number", (req, res) => {
        db.Post.findAll({
            where: {
                [Op.or]: [
                    {
                      description: {[Op.like]: `%${req.params.search}%`}
                    },
                    {
                      recipe: {[Op.like]: `%${req.params.search}%`}
                    }
                  ]
            },
            limit: parseInt(req.params.number),
            order: [['createdAt', 'DESC']]
        })
        .then(results=> {
            res.json(results);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    })

    // Route to get all users
    app.get("/api/users/:username/:number", (req, res) => {
        db.User.findAll({
            where: {
                username: {[Op.like]: `${req.params.username}%`}
            },
            limit: parseInt(req.params.number),
            order: [['username', 'DESC']]
        })
        .then(results=> {
            res.json(results);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    })

    // route to delete post
    app.delete("/post/:post", (req, res) => {
        db.Post.destroy({
            where: {
                id: req.params.post
            }
        })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });

    app.get("/searchpost/:search/:number", (req, res) => {
        db.Post.findAll({
            where: {
                //description: {[Op.like]: `%${req.params.search}%`},
                [Op.or]: [
                    {
                      description: {[Op.like]: `%${req.params.search}%`}
                    },
                    {
                      recipe: {[Op.like]: `%${req.params.search}%`}
                    }
                  ]
            },
            limit: parseInt(req.params.number),
            order: [['createdAt', 'DESC']]
        })
        .then(results=> {
            res.json(results);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    })

    // Process the FOOD file upload and upload to Google Cloud Storage.
    app.post('/post/upload', multer.single('image'), (req, res, next) => {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        // Create post in db to get id to reference
        db.Post.create(req.body)
            .then(postInfo => {
                var postId = postInfo.dataValues.id;
                // Create a new blob in the bucket and upload the file data.
                const fileExt = req.file.mimetype.split("/")[1];
                const blobFood = bucketFood.file(postId + "." + fileExt);
                const blobStream = blobFood.createWriteStream({
                    resumable: false,
                });
                blobStream.on('error', err => {
                    next(err);
                });

                blobStream.on('finish', () => {
                    // The public URL can be used to directly access the file via HTTP.
                    const publicUrl = format(
                        `https://storage.googleapis.com/${bucketFood.name}/${blobFood.name}`
                    );
                    predictImage(publicUrl)
                        .then(response => {
                            var concepts = response['outputs'][0]['data']['concepts'];
                            db.Post.update({ image: publicUrl }, {
                                where: {
                                    id: postId
                                }
                            })
                            .then(() => {
                                let results = {
                                    concepts: concepts,
                                    imageUrl: publicUrl,
                                    postId: postId
                                }
                                res.status(200).send(results);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400);
                                res.json(err);
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).send("Bad request");
                        });
                });

                blobStream.end(req.file.buffer);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Bad request");
            });
    });

    // app.get("/api/users/:username", (req, res) => {
    //     db.User.findAll({
    //         where: {
    //             UserId: req.params.username
    //         },
    //         limit: parseInt(req.params.usernumber),
    //         order: [['username', 'DESC']]
    //     }).then(user=>{
    //         user.addBookmarked(4)
    //         res.json(user);
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(400).send("Bad request");
    //     });
    // })

    
    app.get("/api/bookmark/all/:userId", (req, res) => {
        db.User.findOne({
            where:{
                id: parseInt(req.params.userId)
            },include:[
                // db.Post,
                {
                    model:db.Post,
                    as:"Bookmarked",
                    include: [{model: db.Comment}]

                }
            ]
        }).then(user=>{
            // console.log(user.Bookmarked);
            res.json(user.Bookmarked);
        }).catch(err => {
            console.log(err);
            res.status(400).send("Bad request");
        });
    });

    app.post("/api/bookmark/save", (req, res) => {
        db.User.findOne({
            where:{
                id: 3
            }
        }).then(user=>{
            user.addBookmarked(4) 
            res.json(user.Bookmarked);
        }).catch(err => {
            console.log(err);
            res.status(400).send("Bad request");
        });
        
    });
    
    
    app.get("/api/followers/all", (req, res) => {
        db.User.findOne({
            where:{
                id: 4
            },include:[
                // db.Post,
                {
                    model:db.User,
                    as:"Follower"
                }
            ]
        }).then(user=>{
            res.json(user.Follower);
        }).catch(err => {
            console.log(err);
            res.status(400).send("Bad request");
        });
    })
    

    app.post("/api/followers/save/:follower/:following", (req, res) => {
        db.User.findOne({
            where:{
                id: req.params.follower
            }
        }).then(user=>{
            user.addFollower(parseInt(req.params.following)) 
            res.json(user);
        }).catch(err => {
            console.log(err);
            res.status(400).send("Bad request");
        });
    })
};
