var rp = require('request-promise')
var dotenv = require('dotenv');
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

  getpet: function (petid) {
    var options = {
      uri: 'http://api.petfinder.com/pet.get?key=' + process.env.API_KEY + '&id=' + petid + '&format=json',
      headers: {
            'User-Agent': 'Request-Promise'
        },
     json: true,
     transform2xxOnly: false,
     transform: function (response) {
       var pet = {}

       pet["id"] = response.petfinder.pet.id.$t
       pet["name"] = response.petfinder.pet.name.$t
       pet["age"] = response.petfinder.pet.age.$t
       if (response.petfinder.pet.sex.$t === "F") {
         pet["sex"] = "Female"
       }
       if (response.petfinder.pet.sex.$t === "M") {
         pet["sex"] = "Male"
       }
       pet["breed"] = response.petfinder.pet.breeds.breed.$t
       pet["shelterid"] = response.petfinder.pet.shelterId.$t
       pet["description"] = response.petfinder.pet.description.$t

       pet["image"] = response.petfinder.pet.media.photos.photo[2].$t
       
       pet["address"] = response.petfinder.pet.contact.address1.$t
       pet["city"] = response.petfinder.pet.contact.city.$t
       pet["state"] = response.petfinder.pet.contact.state.$t
       pet["zip"] = response.petfinder.pet.contact.zip.$t
       pet["phone"] = response.petfinder.pet.contact.phone.$t
       pet["email"] = response.petfinder.pet.contact.email.$t

       return pet
     }
    }

    return rp(options).promise()
  }

}
