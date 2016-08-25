var petfinderwrapper = require('../../PetFinderWrapper')
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {

	index: function(req, res) {
		var zip = req.params.zip
		var offset = req.params.offset
		var current_index = req.params.number
		var details = req.param('details');

		petfinderwrapper.getpets(zip,offset).then(function(wrapper){
				return res.view('index', {
					searchresults: wrapper,
					current_index: current_index,
					zip: zip,
					offset: offset,
					details: details
				});
		  })
		  .catch(function (err) {
				console.log(err)
				return res.json(err)
	  })

	},

	addfavorite: function (req, res) {
		var petfinderid = req.allParams().petfinderid.toString()
		var userid = req.allParams().userid.toString()

		function addfavorite(userid, petfinderid, callback) {
			User.native(function (err, collection) {
				collection.update({_id: ObjectId(userid)},{$addToSet:{favorites:petfinderid}},
					function (err) {
						console.log(err)
					}
				)
			})
			callback()
		}

		addfavorite(userid, petfinderid, function() {
			req.flash('message', 'Favorited!');
			return res.redirect('back');
		});
	},

	getfavorites: function(req, res) {
		var userid = req.params.userid

		User.find({id: userid}).then(function (results) {
		  return Promise.all(results[0].favorites.map(function(favorite) {
		    return petfinderwrapper.getpet(favorite)
		  }))
		}).then(function(petobjects) {
		  return res.view('favorites', {
		    favorites: petobjects
		  });
		})
		.catch(function (err) {
		  console.log(err)
		  return res.json(err)
		});
	},

	unfavorite: function (req, res) {
		var petfinderid = req.allParams().petfinderid.toString()
		var userid = req.allParams().userid.toString()

		function unfavorite(userid, petfinderid, callback) {
			User.native(function (err, collection) {
				collection.update({_id: ObjectId(userid)},{$pull:{favorites:petfinderid}},
					function (err) {
						console.log(err)
					}
				)
			})
			callback()
		}

		unfavorite(userid, petfinderid, function() {
			return res.redirect('back');
		});
	}

}
