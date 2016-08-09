var request = require('request');
var dotenv = require('dotenv');
dotenv.load();

//Get HTTP Response
var body = request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    return body
  }
})

//Turn actual body of response into JSON
var jsonbody = JSON.parse(body.responseContent.body)

//Access Array of Pets from response
var allpets = jsonbody.petfinder.pets.pet

//Loop through Array of Pets
  //Create JS objects for each Pet w/ only relevant data

var petsarray = []

for (var i = 0, len = allpets.length; i < len; i++) {
  var obj = {}

  obj["id"] = allpets[i].id.$t
  obj["name"] = allpets[i].name.$t
  obj["age"] = allpets[i].age.$t
  obj["sex"] = allpets[i].sex.$t
  obj["breed"] = allpets[0].breeds.breed.$t
  obj["shelterid"] = allpets[0].shelterId.$t

  obj["description"] = allpets[0].description.$t
  obj["image"] = allpets[0].media.photos.photo[2].$t

  obj["address"] = allpets[0].contact.address1.$t
  obj["city"] = allpets[0].contact.city.$t
  obj["state"] = allpets[0].contact.state.$t
  obj["zip"] = allpets[0].contact.zip.$t
  obj["phone"] = allpets[0].contact.phone.$t.trim()
  obj["email"] = allpets[0].contact.email.$t

  petsarray.push(obj)
}

// petsarray contains js objects of all the neccessary pets info
