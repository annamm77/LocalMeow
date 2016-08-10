var request = require('request');
var dotenv = require('dotenv');
dotenv.load();

module.exports = {

	index: function (req, res) {
		var PetFinderWrapper = require('../../PetFinderWrapper.js');
		console.log("I'm the PetFinderWrapper and I have this many keys: " + Object.keys(PetFinderWrapper).length)
		console.log("I'm this long: " + PetFinderWrapper.length)
		console.log("This is what I am: " + PetFinderWrapper)
		console.log("If I'm working, this'll be a cat object: " + PetFinderWrapper[0])
		console.log(PetFinderWrapper)

		request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
				return res.view('index', {
					searchresults: PetFinderWrapper
				});
		  }
		})
	}
};
