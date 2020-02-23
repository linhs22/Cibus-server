var db = require("../SequelizeModels");
const {format} = require('util');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const {predictImage} = require("../API/clarifai-api");

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

module.exports = function(app) {

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

    app.delete("/api/auth/:username", (req, res) => {
        console.log(req.params.username);
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

    app.get("/api/posts/:userid/:number", (req, res) => {
        console.log("posts");
        db.Post.findAll({
            where: {
                UserId: req.params.userid
            },
            limit: parseInt(req.params.number),
            order: [['createdAt', 'DESC']],
            include: [{model: db.User}]
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
        db.Followers.findAll({
            where: {
                followerUserId: parseInt(req.params.userid)
            }
        })
        .then(results => {
            var followersArray = results.map(result => result.followerId);
            db.Post.findAll({
                offset: parseInt(req.params.offset),
                limit: 1,
                where: {
                    UserId: followersArray
                },
                order: [['createdAt', 'DESC']],
                include: [{model: db.User}]
            })
            .then(results=> {
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

    app.get("/api/users/:username/:number", (req, res) => {
        db.User.findAll({
            where: {
                UserId: req.params.username
            },
            limit: parseInt(req.params.usernumber),
            order: [['username', 'DESC']]
        })
    })

    app.delete("/post/:post", (req, res) => {
        console.log(req.params.post);
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

    // Process the FOOD file upload and upload to Google Cloud Storage.
    app.post('/post/upload', multer.single('image'), (req, res, next) => {
        if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
        }
        // Create post in db to get id to reference
        console.log("Hi!");
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
                db.Post.update({image: publicUrl}, {
                    where: {
                        id: postId
                    }
                })
                .then(() => {
                    var results = {
                        concepts: concepts,
                        imageUrl: publicUrl
                    }
                    //concepts.push({imageUrl: publicUrl});
                    console.log(results);
                    res.status(200).send(results);
                })
                .then(() => {
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
};