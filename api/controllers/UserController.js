module.exports = {
	create: function(req, res) {
  User.create(req.body).exec(function(err, result){
    if (err) {
			return res.redirect('back');
    }
		sails.controllers.auth.login(req, res)
  });
}

};
