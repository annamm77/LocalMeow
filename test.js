db.allDocs({include_docs: true}).then(function (result) {
  return Promise.all(result.rows.map(function (row) {
    return db.remove(row.doc);
  }));
}).then(function (arrayOfResults) {
  // All docs have really been removed() now!
});

query.then(function (results) {
  return Promise.all(results[0].favorites.map(function(favorite) {
    return petfinderwrapper.getpet(favorite).then(function(pet){
        petsarray.push(pet)
        console.log("The length of pets array after iteration" + petsarray.length)
      })
  }))
}).then(function(result) {
  console.log("The result headed to the view is: " + result)

  return res.view('test', {
    test: result
  });
})
.catch(function (err) {
  console.log(err)
  return res.json(err)
});
