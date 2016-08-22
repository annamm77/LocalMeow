var petfinderwrapper = require('../../PetFinderWrapper')
var wrappertest = require('../../WrapperTest')

module.exports = {

	index: function (req, res) {

		if (req.params.number === undefined) {
			req.params.number = 0
		}

		if (req.params.zip === undefined) {
			var zip = req.query.zip
		} else {
			var zip = req.params.zip
		}

		wrappertest.getallpets(zip).then(function(wrapper){
				return res.view('index', {
					current_index: req.params.number,
					searchresults: wrapper,
					zip: zip
				});
		  })
		  .catch(function (err) {
				return res.view('404')
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
