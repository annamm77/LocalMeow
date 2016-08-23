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
		var catid = req.params.id
		var userid = req.params.user

		db.user.update({_id:ObjectId("57b7c830f339d7e00379aca0")},{$addToSet:{favorites:"Test3"}})
		db.user.find(ObjectId('57b7c830f339d7e00379aca0'))

		//continue reseraching how to use native mongo db queries in sails.

	}

};
