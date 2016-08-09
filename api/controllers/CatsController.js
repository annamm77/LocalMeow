/**
 * CatsController
 *
 * @description :: Server-side logic for managing cats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {

	index: function (req, res) {
    res.view();
	}


	// index: function(req, res) {
	// 		Applicant.findAll().done(function(err, applicants) {
	// 				res.view({
	// 						apps: applicants
	// 				});
	// 		});
	// }

};
