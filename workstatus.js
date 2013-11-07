// Users = new Meteor.Collection("users");

    Meteor.users.allow({
      update: function(userId, docs, fields, modifier) { 
        return doc.owner === userId;
        // if (userId !== docs._id) { 
        //   return false;
        // } else { 
        //   return true;
        // } 
      }, 
      insert: function(userId, doc) { 
        return (userId && doc.owner === userId);
      },
      remove: function(userId, doc) { 
        return true;
        // return doc.owner === userId;
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
