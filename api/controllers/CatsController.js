var petfinderwrapper = require('../../PetFinderWrapper')

module.exports = {

	index: function (req, res) {

		if (req.params.number === undefined) {
			req.params.number = 0
		}

		petfinderwrapper.getallpets().then(function(petsarray){
				return res.view('index', {
					current_index: req.params.number,
					searchresults: petsarray
				});
		  })
		  .catch(function (err) {
				return res.view('404')
		  })
	},

	favorite: function (req, res) {
		//get petfinder id #
		//get pet array %
		//get user id #
		return res.view('test', {
			petfinder: "boop",
			arrayindex: "hi",
			userid: "yup"
		})
	}



};
