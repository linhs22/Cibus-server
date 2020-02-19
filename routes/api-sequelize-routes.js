var db = require("../SequelizeModels");

module.exports = function(app) {

    app.post("/api/auth/signup", (req, res) => {
        console.log(req.body);
        db.User.create(req.body)
        .then(userData => {
            res.json(userData);
        });
    });

    // app.put("/api/auth/upload", (req, res) => {
    //     console.log(req.body);
    //     db.User.update({ profileImage: req.body }, {
    //         where: {
    //           username: req.body.username
    //         }
    //       });
    // });

    app.get("/api/auth", (req, res) => {
        console.log(req.query);
        db.User.findOne({
            where: {
                username: req.query.username
            }
        })
        .then(dbUser => {
            res.json("Hello");
        })
    });
}