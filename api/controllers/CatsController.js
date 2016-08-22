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

	favorite: function (req, res) {
		var catid = req.query.id
		var catindex = req.query.num
		var userid = req.query.user

		//this works to find the right user in sails console.
		// User.findOne({id:'57b742cf32ae8f6419f9ef90'}).exec(function(err, users){console.log(users)});

		//native mongo
			// db.user.findOne({_id : ObjectId("57b74523af3501a5190f22cd")})
			// db.user.addToSet({ _id : ObjectId("57b74523af3501a5190f22cd") },{ $push: { favorites: "test" }})

		//continue reseraching how to use native mongo db queries in sails.
		User.native(function(err, collection) {
			if (err) return res.serverError(err);
				collection.addToSet({ _id : "ObjectId" + "(" + userid + ")" },{ $push: { favorites: catid }})
			return res.view('test')
		});

	}

};
