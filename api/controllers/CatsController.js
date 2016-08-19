var petfinderwrapper = require('../../PetFinderWrapper')

module.exports = {

	index: function (req, res) {

		if (req.params.index === undefined) {
			req.params.index = 0
		}

		petfinderwrapper.getallpets().then(function(petsarray){
				return res.view('index', {
					current_index: req.params.index,
					searchresults: petsarray
				});
		  })
		  .catch(function (err) {
				return res.view('404')
		  })
	}

	// scroll: function (req, res) {
	// 	petfinderwrapper.getallpets().then(function(petsarray){
	// 		return res.view('test', {
	// 			test: req.params.index
	// 		})
	// 	})
	// 	.catch(function (err) {
	// 		return res.view('404')
	// 	})
	// }

};
