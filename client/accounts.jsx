/**
 * Created by jorrespijker on 10-05-16.
 */

Template.login.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("lobby"); // User succeeds
            }
        });
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("lobby"); // User succeeds
            }
        });
    }
});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});


Template.logindesktop.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});


//Create kamerNumber
function kamerNumber (){
    kamerNumber = Channels.find().count() + 1;
    return kamerNumber;

};

//Create kamerCode
function kamerCode() {

    var kamerGetal = kamerGetal = Math.floor(Math.random() * 9000) + 1000;
    var getalVinden = Channels.find({code: kamerGetal}).count();

     while(getalVinden >= 1) {
         kamerGetal = Math.floor(Math.random() * 9000) + 1000;
     };


    kamerCode = kamerGetal;

    return kamerCode;
};

Template.registerdesktop.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                //Create room
                Channels.insert({
                    name: kamerNumber(),
                    code: kamerCode()
                });

                Router.go("lobby"); // User succeeds
            }
        });
    }
});


Template.logindesktop.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
                //Create room
                Channels.insert({
                    name: kamerNumber(),
                    code: kamerCode()
                });

                Router.go("lobby"); // User succeeds
            }
        });
    }
});


// Error Handling

$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
});

Template.login.onRendered(function(){
    $('.login').validate();
});

Template.register.onRendered(function(){
    $('.register').validate();
});


Template.logindesktop.onRendered(function(){
    $('.login').validate();
});

Template.registerdesktop.onRendered(function(){
    $('.register').validate();
});