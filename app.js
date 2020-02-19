
'use strict';

const process = require('process'); // Required to mock environment variables

// [START gae_storage_app]
const {format} = require('util');
const express = require('express');
const Multer = require('multer');
const bodyParser = require('body-parser');
const Clarifai = require('clarifai');

const PORT = process.env.PORT || 8090;

//////// Sequelize db ////////
// Requiring our models for syncing
var db = require("./SequelizeModels");

//////// Clarifai Stuff ////////
const clarifai = new Clarifai.App({
    apiKey: '46b5b39ef59b479b98c0c4b745c479e8'
   });

async function predictImage(url) {
  try {
    const response = await clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", url);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
  
  // .then(response => {
  //     // do something with response
      
  //   })
  // .catch(err => {
    
  // });
};

//////// GOOGLE Stuff ////////
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucketFood = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_FOOD);
const bucketProfile = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_PROFILE);

// Display a form for uploading files.
app.get('/', (req, res) => {
  res.render('form.pug');
});

// Process the FOOD file upload and upload to Google Cloud Storage.
app.post('/pic/upload/food', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blobFood = bucketFood.file(req.file.originalname);
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
        res.status(200).send(concepts);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Bad request");
    }); 
  }); 

  blobStream.end(req.file.buffer);
});

// Process the PROFILE file upload and upload to Google Cloud Storage.
app.post('/pic/upload/profile', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blobProfile = bucketProfile.file(req.file.originalname);
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
    res.status(400).send("Bad request"); 
  }); 

  blobStream.end(req.file.buffer);
});

//Routes
require("./routes/api-sequelize-routes.js")(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    console.log('Press Ctrl+C to quit.');
  });
});

module.exports = app;
