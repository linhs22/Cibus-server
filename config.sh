#!/bin/bash
# Run source ./config.sh to run this script file

export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Paolo\Documents\Keys\foodie-cibus-2020-095ca4477cb8.json"
#export GOOGLE_APPLICATION_CREDENTIALS="/Users/henrylin/Desktop/keys/foodie-cibus-2020-095ca4477cb8.json"
export GCLOUD_STORAGE_BUCKET_FOOD="foodie-cibus-bucket-1"
export GCLOUD_STORAGE_BUCKET_PROFILE="foodie-cibus-bucket-2"
export SQL_USER="root"
export SQL_PASSWORD="4c3Bccus7mwP4ei0"
export SQL_DATABASE="cibus_1"
export CLOUD_SQL_CONNECTION_NAME="foodie-cibus-2020:us-west2:cibus"
export CLARIFAI_KEY="46b5b39ef59b479b98c0c4b745c479e8"

#To reseed
#Force true in App.js
#>sequelize db:seed:all
