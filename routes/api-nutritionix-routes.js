var db = require("../SequelizeModels");
const {getFoodInfo} = require("../API/nutritionix-api");

module.exports = function (app) {
    //Route to check if user exist

    app.post("/api/nutrition", (req, res) => {
        getFoodInfo(res).then(dbNutrition => {
            res.json(dbNutrition);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(err);
        });
    });



};