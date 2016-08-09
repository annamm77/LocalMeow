var request = require('request');

module.exports = {

	index: function (req, res) {

		request('http://api.petfinder.com/pet.find?key=7ed5e3e2b82b565a0578223bb4e0ba92&animal=cat&location=98005&format=json', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
				return res.view('index', {
					test: body
				});
		  }
		})
	}
};
