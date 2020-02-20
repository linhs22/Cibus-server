const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY 
   });

async function predictImage(url) {
  try {
    const response = await clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", url);//Firt parameter is Clarifai model name
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

exports.predictImage = predictImage;