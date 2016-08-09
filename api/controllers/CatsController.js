var request = require('request');
var dotenv = require('dotenv');
dotenv.load();

module.exports = {

	index: function (req, res) {
		request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
				return res.view('index', {
					test: body
				});
		  }
		})
	}
};
