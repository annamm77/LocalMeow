var rp = require('request-promise')
var dotenv = require('dotenv');
dotenv.load();

var options = {
  uri: 'http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json',
  headers: {
        'User-Agent': 'Request-Promise'
    },
 json: true
}

rp(options)
  .then(function (repos) {

    var allpets = repos.petfinder.pets.pet

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
  })
  .catch(function (err) {
    console.log("That did not work not even a BIT" + err);
  })

// module.exports = ;

// function makeCall (callback) {
//   request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       callback(JSON.parse(body))
//     } else {
//       console.log("Error")
//     }
//   }
// )}
//
// function handleResults(results) {
//   console.log("Im in handle results!!!")
  // var parsedbody = results
  // var allpets = parsedbody.petfinder.pets.pet
  //
  // var petsarray = []
  //
  // for (var i = 0, len = allpets.length; i < len; i++) {
  //   var obj = {}
  //
  //   obj["id"] = allpets[i].id.$t
  //   obj["name"] = allpets[i].name.$t
  //   obj["age"] = allpets[i].age.$t
  //   obj["sex"] = allpets[i].sex.$t
  //   obj["breed"] = allpets[i].breeds.breed.$t
  //   obj["shelterid"] = allpets[i].shelterId.$t
  //   obj["description"] = allpets[i].description.$t
  //
  //   if (Object.getOwnPropertyNames(allpets[i].media).length === 0) {
  //     continue
  //   } else {
  //     obj["image"] = allpets[i].media.photos.photo[2].$t
  //   }
  //
  //   obj["address"] = allpets[i].contact.address1.$t
  //   obj["city"] = allpets[i].contact.city.$t
  //   obj["state"] = allpets[i].contact.state.$t
  //   obj["zip"] = allpets[i].contact.zip.$t
  //   obj["phone"] = allpets[i].contact.phone.$t.trim()
  //   obj["email"] = allpets[i].contact.email.$t
  //
  //   petsarray.push(obj)
  //   console.log("PETS ARRAY IS THIS LONG:" + petsarray.length)
  // }
  // return petsarray
// }
//
// makeCall(function(results){
//     console.log('results:',results)
//     handleResults(results)
// });
//
//
// request('http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=98005&format=json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//
//     var parsedbody = JSON.parse(body)
//     var allpets = parsedbody.petfinder.pets.pet
//
//     var petsarray = []
//
//     for (var i = 0, len = allpets.length; i < len; i++) {
//       var obj = {}
//
//       obj["id"] = allpets[i].id.$t
//       obj["name"] = allpets[i].name.$t
//       obj["age"] = allpets[i].age.$t
//       obj["sex"] = allpets[i].sex.$t
//       obj["breed"] = allpets[i].breeds.breed.$t
//       obj["shelterid"] = allpets[i].shelterId.$t
//       obj["description"] = allpets[i].description.$t
//
//       if (Object.getOwnPropertyNames(allpets[i].media).length === 0) {
//         continue
//       } else {
//         obj["image"] = allpets[i].media.photos.photo[2].$t
//       }
//
//       obj["address"] = allpets[i].contact.address1.$t
//       obj["city"] = allpets[i].contact.city.$t
//       obj["state"] = allpets[i].contact.state.$t
//       obj["zip"] = allpets[i].contact.zip.$t
//       obj["phone"] = allpets[i].contact.phone.$t.trim()
//       obj["email"] = allpets[i].contact.email.$t
//
//       petsarray.push(obj)
//     }
//   }
// })
