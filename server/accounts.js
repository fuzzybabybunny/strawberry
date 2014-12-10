// Set up login services
Meteor.startup(function() {

  // Remove configuration entries in case service is already configured
  ServiceConfiguration.configurations.remove({
    $or: [{
      service: "facebook"
    }]
  });

  // Add Facebook configuration entry
  ServiceConfiguration.configurations.insert({
    "service": "facebook",
    "appId": "809309035792738",
    "secret": "b87eecb7bc003b05db20976bc2b19c36"
  });
});

// Accounts.onCreateUser(function (options, user) {
//   if (options && options.profile) {
//           user.profile = options.profile;
//   }

//   if (user.services) {

//       var service = _.pairs(user.services)[0];
//       console.log(service);
//       var serviceName = service[0];
//       var serviceData = service[1];

//       console.log("serviceName", serviceName);

//       if (serviceName == "facebook") {
//           user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
//           user.email = [
//               {"address": serviceData.email, "verified": true}
//           ];
//           console.log(serviceData.id);
//           user.profile = {"first_name": serviceData.first_name, "last_name": serviceData.last_name, "avatar": user.services.facebook.picture};
//       }

//   }
//   console.log("user created :", user);

//   return user;

//   // return user;
// });