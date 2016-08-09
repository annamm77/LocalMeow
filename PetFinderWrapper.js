var request = require('request');
var dotenv = require('dotenv');
dotenv.load();

request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var parsedbody = JSON.parse(body)
    var allpets = parsedbody.petfinder.pets.pet

    var petsarray = []

    for (var i = 0, len = allpets.length; i < len; i++) {
      var obj = {}

      obj["id"] = allpets[i].id.$t
      obj["name"] = allpets[i].name.$t
      obj["age"] = allpets[i].age.$t
      obj["sex"] = allpets[i].sex.$t
      obj["breed"] = allpets[i].breeds.breed.$t
      obj["shelterid"] = allpets[i].shelterId.$t
      obj["description"] = allpets[i].description.$t

      if (Object.getOwnPropertyNames(allpets[i].media).length === 0) {
        continue
      } else {
        obj["image"] = allpets[i].media.photos.photo[2].$t
      }

      obj["address"] = allpets[i].contact.address1.$t
      obj["city"] = allpets[i].contact.city.$t
      obj["state"] = allpets[i].contact.state.$t
      obj["zip"] = allpets[i].contact.zip.$t
      obj["phone"] = allpets[i].contact.phone.$t.trim()
      obj["email"] = allpets[i].contact.email.$t

      petsarray.push(obj)
    }
    return petsarray
  }
})
