/**
 * CatsController
 *
 * @description :: Server-side logic for managing cats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {
	index: function (req, res) {
		console.log("hello from the index")

		request('http://api.petfinder.com/pet.find?key=SECRETKEYHERE&animal=cat&location=98005', function (error, response, body) {
			console.log("I'm in the request in the index!!!")
			if (!error && response.statusCode == 200) {
		    console.log(body)
				return res.view('cats/index',{
			    hottestOvens: ovens
			  });
		  }
		)

}

	// index: function(req, res) {
	// 		Applicant.findAll().done(function(err, applicants) {
	// 				res.view({
	// 						apps: applicants
	// 				});
	// 		});
	// }

};
