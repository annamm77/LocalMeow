module.exports = {
	create: function(req, res) {
  User.create(req.body).exec(function(err, result){
    if (err) {
      //Handle Error
    }
		sails.controllers.auth.login(req, res)
  });
}

};
