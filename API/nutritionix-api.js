const axios = require('axios');

async function getFoodInfo(data) {
  console.log(data);
  try {
    headers = {
      'x-app-id': "651c4545",
      'x-app-key': "fdadf3d16015323a2a722196f4e33e2c",
      'Content-Type': 'application/JSON',
      'x-remote-user-id': 0
    }
    var data = {
      query: data,
      aggregate: data
    };

    const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data, { headers: headers })
    // console.log(response.data.foods)
    return response.data

  } catch (err) {
    console.log(err);
  }
}

exports.getFoodInfo = getFoodInfo;