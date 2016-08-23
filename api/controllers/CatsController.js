var petfinderwrapper = require('../../PetFinderWrapper')
var Promise = require("bluebird");

module.exports = {

	index: function(req, res) {
		var zip = req.params.zip
		var offset = req.params.offset
		var current_index = req.params.number

		petfinderwrapper.getpets(zip,offset).then(function(wrapper){
				return res.view('index', {
					searchresults: wrapper,
					current_index: current_index,
					zip: zip,
					offset: offset
				});
		  })
		  .catch(function (err) {
				console.log(err)
				return res.json(err)
	  })

	},

	favorite: function (req, res) {
		var petfinderid = req.allParams().petfinderid.toString()
		var userid = req.allParams().userid.toString()
		var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

		var addfavorite = function (userid,petfinderid) {
	    return new Promise(function (resolve, reject) {
				User.native(function (err, collection) {
					collection.update({_id: ObjectId(userid)},{$addToSet:{favorites:petfinderid}},
					function (err) {
						return res.json(err)
					});
				})
	    });
		}

		addfavorite(userid,petfinderid).then(function(result) {
			return res.view('test');
		})

	}
}
