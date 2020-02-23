var db = require("../SequelizeModels");
const { getFoodInfo } = require("../API/nutritionix-api");

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


    app.post("/post/submit", (req, res) => {
        getFoodInfo(res)
            .then(response => {
                var data = {
                    calories: parseFloat(response.foods[0].nf_calories.toFixed(0)),
                    fat: parseFloat(response.foods[0].nf_total_fat.toFixed(0)),
                    calfat: parseFloat((9 * response.foods[0].nf_total_fat).toFixed(0)),
                    fatpercent: parseFloat(((response.foods[0].nf_total_fat / 65) * 100).toFixed(0)),
                    satfat: parseFloat(response.foods[0].nf_saturated_fat.toFixed(1)),
                    transfat: parseFloat(response.foods[0].full_nutrients[53].value.toFixed(1)),
                    cholesterol: parseFloat(response.foods[0].nf_cholesterol.toFixed(0)),
                    cholesterolpercent: parseFloat(((response.foods[0].nf_calories / 3000) * 100).toFixed(0)),
                    sodium: parseFloat(response.foods[0].nf_sodium.toFixed(0)),
                    sodiumpercent: parseFloat(((response.foods[0].nf_sodium.toFixed(0) / 2400) * 100).toFixed(0)),
                    totalcarbs: parseFloat(response.foods[0].nf_total_carbohydrate.toFixed(0)),
                    carbpercent: parseFloat(((response.foods[0].nf_total_carbohydrate / 300) * 100).toFixed(0)),
                    fiber: parseFloat(response.foods[0].nf_dietary_fiber.toFixed(0)),
                    fiberpercent: parseFloat(((response.foods[0].nf_dietary_fiber / 25) * 100).toFixed(0)),
                    sugar: parseFloat(response.foods[0].nf_sugars.toFixed(1)),
                    protein: parseFloat(response.foods[0].nf_protein.toFixed(1)),
                    potassium: parseFloat(((response.foods[0].nf_potassium / 3500) * 100).toFixed(0)),
                    vitd: parseFloat(response.foods[0].full_nutrients[35].value.toFixed(1)),
                    vita: parseFloat(((response.foods[0].full_nutrients[30].value / 5000) * 100).toFixed(1)),
                    vitc: parseFloat(((response.foods[0].full_nutrients[40].value / 60) * 100).toFixed(1)),
                    calcium: parseFloat(((response.foods[0].full_nutrients[19].value / 1300) * 100).toFixed(1)),
                    iron: parseFloat(((response.foods[0].full_nutrients[20].value / 18) * 100).toFixed(1)),
                    serving: parseFloat(response.foods[0].serving_qty),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    PostId: 1
                }

                var arr = [];

                // format for the items and amount
                var items = ['banana', 'apple', 'mango'];
                var amount = [20, 20, 20];
                // 
                var created = new Date();
                var updated = new Date();
                var post = 3

                for (var i = 0; i < items.length; i++) {
                    var obj = {}; // <---- Move declaration inside loop

                    obj['ingredient'] = items[i];
                    obj['amount'] = amount[i];
                    obj['createdAt'] = created;
                    obj['updatedAt'] = updated;
                    obj['PostId'] = post;
                    arr.push(obj);
                }

                // allIngredients = [obj]

                // db.Nutrition.create(data)
                //     .then(nutrition => {
                //         res.json(nutrition);
                //     }).catch(err => {
                //         console.log(err);
                //         res.status(400);
                //         res.json(err);
                //     });

                db.Ingredient.bulkCreate(arr)
                    .then(dbingredient => {
                        res.json(dbingredient);
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