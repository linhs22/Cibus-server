var db = require("../SequelizeModels");
const { getFoodInfo } = require("../API/nutritionix-api");

module.exports = function (app) {

    app.post("/api/nutrition", (req, res) => {
        getFoodInfo(req.body.string)
            .then(dbNutrition => {
                res.json(dbNutrition);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });


    app.post("/post/submit", (req, res) => {

        var data = {
            calories: parseFloat(req.body.nutrition.nf_calories.toFixed(0)),
            fat: parseFloat(req.body.nutrition.nf_total_fat.toFixed(0)),
            calfat: parseFloat((9 * req.body.nutrition.nf_total_fat).toFixed(0)),
            fatpercent: parseFloat(((req.body.nutrition.nf_total_fat / 65) * 100).toFixed(0)),
            satfat: parseFloat(req.body.nutrition.nf_saturated_fat.toFixed(1)),
            transfat: parseFloat(req.body.nutrition.full_nutrients[53].value.toFixed(1)),
            cholesterol: parseFloat(req.body.nutrition.nf_cholesterol.toFixed(0)),
            cholesterolpercent: parseFloat(((req.body.nutrition.nf_calories / 3000) * 100).toFixed(0)),
            sodium: parseFloat(req.body.nutrition.nf_sodium.toFixed(0)),
            sodiumpercent: parseFloat(((req.body.nutrition.nf_sodium.toFixed(0) / 2400) * 100).toFixed(0)),
            totalcarbs: parseFloat(req.body.nutrition.nf_total_carbohydrate.toFixed(0)),
            carbpercent: parseFloat(((req.body.nutrition.nf_total_carbohydrate / 300) * 100).toFixed(0)),
            fiber: parseFloat(req.body.nutrition.nf_dietary_fiber.toFixed(0)),
            fiberpercent: parseFloat(((req.body.nutrition.nf_dietary_fiber / 25) * 100).toFixed(0)),
            sugar: parseFloat(req.body.nutrition.nf_sugars.toFixed(1)),
            protein: parseFloat(req.body.nutrition.nf_protein.toFixed(1)),
            potassium: parseFloat(((req.body.nutrition.nf_potassium / 3500) * 100).toFixed(0)),
            vitd: parseFloat(req.body.nutrition.full_nutrients[35].value.toFixed(1)),
            vita: parseFloat(((req.body.nutrition.full_nutrients[30].value / 5000) * 100).toFixed(1)),
            vitc: parseFloat(((req.body.nutrition.full_nutrients[40].value / 60) * 100).toFixed(1)),
            calcium: parseFloat(((req.body.nutrition.full_nutrients[19].value / 1300) * 100).toFixed(1)),
            iron: parseFloat(((req.body.nutrition.full_nutrients[20].value / 18) * 100).toFixed(1)),
            serving: parseFloat(req.body.nutrition.serving_qty),
            createdAt: new Date(),
            updatedAt: new Date(),
            PostId: req.body.postId
        };

        var arr = [];

        // format for the items and amount
        var items = req.body.ingredients.map(item => item.name);
        var amount = req.body.ingredients.map(item => item.amount);
        // 
        var created = new Date();
        var updated = new Date();
        var post = req.body.postId;

        for (var i = 0; i < items.length; i++) {
            var obj = {}; // <---- Move declaration inside loop

            obj['ingredient'] = items[i];
            obj['amount'] = amount[i];
            obj['createdAt'] = created;
            obj['updatedAt'] = updated;
            obj['PostId'] = post;
            arr.push(obj);
        };

        db.Nutrition.create(data)
            .then(nutrition => {
                db.Ingredient.bulkCreate(arr)
                    .then(dbingredient => {
                        res.json({ dbingredient, nutrition });
                        db.Post.update(
                            {
                                UserId:      req.body.UserId,
                                description: req.body.description,
                             //location: req.body.location, 
                                recipe:      req.body.recipe
                            },                           
                            {where: { id: req.body.postId }
                        })
                        

                    }).catch(err => {
                        console.log(err);
                        res.status(400);
                        res.json(err);
                    });
            }).catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);
            });
    });



};