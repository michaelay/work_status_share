// Users = new Meteor.Collection("users");

Meteor.users.allow({
  update: function(userId, docs, fields, modifier) { 
    return doc.owner === userId;
  }, 
  insert: function(userId, doc) { 
    return (userId && doc.owner === userId);
  },
  remove: function(userId, doc) { 
    return doc.owner === userId;
  }
});

if (Meteor.isClient) {

  Template.status_list.users = function() { 
    return Meteor.users.find(
      {},
      {sort: {"profile.ws.last_update_time": -1}}
    );
  };

  Template.status_list.users_count = function() { 
    return Template.status_list.users().count();
  }

  Template.header.events({
    "click #logout": function(e, tmpl) {
      Meteor.logout(function (err) {
        if (err) { 
          console.log("Logout failed");
        }
      })
    }
  });

  Template.user_loggedout.events({
    "click #login": function(e, tmpl) {
      Meteor.loginWithFacebook({}, function(err){ 
        if (err) {
          console.log("login error");
        } else { 
          console.log("logged in");
        }
      });
    }
  });

  Template.update_status.events({
    "click #update_status_submit": function(e, tmpl) { 
      var text = document.getElementById('update_status_text').value;
      Meteor.users.update(
        {_id:Meteor.user()._id},
        {$set:{
          "profile.ws.status":text,
          "profile.ws.last_update_time":(new Date().getTime() / 1000.0)
        }}
      );
    } 
  });

  Handlebars.registerHelper("prettifyDate", function(timestamp) { 
    var date = new Date(timestamp * 1000); 
    var month = date.getMonth() + 1; 
    var year = date.getFullYear();
    var nday = date.getDate(); 
    var hours = date.getHours();
    var mins = date.getMinutes(); 
    var seconds = date.getSeconds(); 
    return year + "-" + month + "-" + nday + " " + hours + ":" + mins;
  });

  Meteor.subscribe("users");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("users", function() { 
      return Meteor.users.find(
        {},
        {fields: {profile:1, services:1}}
      );
    });

// Accounts.loginServiceConfiguration.remove({
//   service: "facebook"
// });

Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  // appId: 1376259485952394, 
  // secret: "c297d3c967f73e4cd40a265de5ee05a9"
  appId: 558946830850843,  // tvbcomstatus
  secret: "4dda8c684f34e4931a423445ffc0b07d" // tvbcomstatus
});

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
    
  });
}
