var petfinderwrapper = require('../../PetFinderWrapper')

module.exports = {

	index: function (req, res) {
		petfinderwrapper.getallpets().then(function(petsarray){

				return res.json(petsarray);

		  })
		  .catch(function (err) {
				return res.view('404')
		  })
	}
};
