var rp = require('request-promise')
var Promise = require("bluebird");
var dotenv = require('dotenv');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

dotenv.load();

module.exports = {

  getpets: function (zip, lastoffset) {
    var options = {
      uri: 'http://api.petfinder.com/pet.find?key=' + process.env.API_KEY + '&animal=cat&location=' + zip + '&offset=' + lastoffset +'&format=json',
      headers: {
            'User-Agent': 'Request-Promise'
        },
     json: true,
     transform2xxOnly: false,
     transform: function (response) {
       var allpets = response.petfinder.pets.pet

       var wrapper = {}
       var petsarray = []

       for (var i = 0, len = allpets.length; i < len; i++) {
         var obj = {}

         obj["id"] = allpets[i].id.$t
         obj["name"] = allpets[i].name.$t
         obj["age"] = allpets[i].age.$t
         if (allpets[i].sex.$t === "F") {
           obj["sex"] = "Female"
         }
         if (allpets[i].sex.$t === "M") {
           obj["sex"] = "Male"
         }
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
         obj["phone"] = allpets[i].contact.phone.$t
         obj["email"] = allpets[i].contact.email.$t

         petsarray.push(obj)
       }
       wrapper["offset"] = response.petfinder.lastOffset.$t
       wrapper["pets"] = petsarray

       return wrapper
     }
    }

    return rp(options).promise()
  },

  favoritepet: function(userid,petfinderid) {
    return new Promise(function (resolve, reject) {
      console.log("I'm in the promise!!!")
        User.native(function (err, collection) {
          collection.update({_id: ObjectId(userid)},{$addToSet:{favorites:petfinderid}},
          function (err) {
            return err
          });
        })
    });
  }

}
