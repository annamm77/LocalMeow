var petfinderwrapper = require('../../PetFinderWrapper')

module.exports = {

	index: function (req, res) {
		petfinderwrapper.getallpets().then(function(petsarray){
				return res.view('index', {
					searchresults: petsarray
				});
		  })
		  .catch(function (err) {
				return res.view('404')
		  })
	},

	scroll: function (req, res) {
		petfinderwrapper.getallpets().then(function(petsarray){
			return res.view('test', {
				test: req.params.index
			})
		})
		.catch(function (err) {
			return res.view('404')
		})
	}

};
