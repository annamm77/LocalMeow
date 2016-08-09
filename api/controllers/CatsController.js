var request = require('request');

module.exports = {

	index: function (req, res) {
		return res.view('index', {
			test: "boop"
		});
	}


	// request('http://api.petfinder.com/pet.find?key=KEYHERE&animal=cat&location=98005', function (error, response, body) {
	//   if (!error && response.statusCode == 200) {
	//     console.log(body)
	//   }
	// })

};
