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
			req.flash('message', 'Favorited!');
			return res.redirect('back');
		});

	},

	getfavorites: function(req, res) {
		var userid = req.allParams().userid.toString()
		var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

		var query = User.find({ where: { _id: ObjectId(userid) }, limit: 1 })

		query.exec(function callBack(err,results){
			return res.view('test', {
				test: results
			});
    });

		///////NOTES HERE
		//Get favorites array from mongodb

		//Create Wrapper method to transform Pet ID --> Cat Object

		//Return new array to view and iterate through

	}
}

// returns array of favorites
// db.user.findOne({_id : ObjectId("57bcc4df7d74f5be26c3e62e")}).favorites
