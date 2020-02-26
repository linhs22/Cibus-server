"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// var sequelize = new Sequelize("cibus_1", "root", "4c3Bccus7mwP4ei0", {
//   dialect: 'mysql',
//   // e.g. host: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
//   host: '/cloudsql/foodie-cibus-2020:us-west2:cibus',
//   pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//   },
//   dialectOptions: {
//       // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
//       // same as host string above
//       socketPath: '/cloudsql/foodie-cibus-2020:us-west2:cibus'
//   },
//   logging: false,
//   operatorsAliases: false
// });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
