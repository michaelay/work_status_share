allowed_accounts = ['michaelay@gmail.com'];

Accounts.loginServiceConfiguration.allow({
  insert: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

// Accounts.loginServiceConfiguration.remove({
//   service: "facebook"
// });

// Accounts.loginServiceConfiguration.insert({
//   service: "facebook",
//   appId: 1376259485952394, 
//   secret: "c297d3c967f73e4cd40a265de5ee05a9"
//   // appId: 558946830850843,  // tvbcomstatus
//   // secret: "4dda8c684f34e4931a423445ffc0b07d" // tvbcomstatus
// });

// Accounts.validateNewUser(function(user) { 
//   if (user.services.facebook && user.services.facebook.email) {
//     var email = user.services.facebook.email;
//     if (allowed_accounts.indexOf(email) === -1) {
//       return true;
//     } else { 
//       return true;
//     }
//   }
// });

// Accounts.onCreateUser(function(options, user) {
//   console.log("on create user");
//   user.profile_picture_url = "https://graph.facebook.com/" + user.services.facebook.username + "/picture";
//   return user;
// });