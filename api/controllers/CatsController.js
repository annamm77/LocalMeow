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
		var petfinderid = req.allParams().petfinderid.toString()
		var userid = req.allParams().userid.toString()
		console.log("I'm in the controller function!!!")

		petfinderwrapper.favoritepet(userid,petfinderid).then(function(){
				return res.view('test');
			})
			.catch(function (err) {
				console.log(err)
				return res.json(err)
		})

	}
}
