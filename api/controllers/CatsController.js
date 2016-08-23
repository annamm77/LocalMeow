var petfinderwrapper = require('../../PetFinderWrapper')

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

	addfavorite: function (req, res) {
		var petfinderid = req.allParams().petfinderid.toString()
		var userid = req.allParams().userid.toString()
		var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

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
			return res.redirect('back');
		});

	}
}

// returns array of favorites
// db.user.findOne({_id : ObjectId("57bcc4df7d74f5be26c3e62e")}).favorites
