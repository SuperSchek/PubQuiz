import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

Template.login.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                // Router.go("home"); // User succeeds
            }
        });
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                Session.set('errorMessage', error.reason);
                console.log(error.reason);
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




// Router.onBeforeAction(animateContentOut);

Meteor.startup(() => {
});


function animatieClass() {
    document.getElementById('start-screen').className = "animatieOut";
}