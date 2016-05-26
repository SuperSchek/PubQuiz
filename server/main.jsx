import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });
    new Mongo.Collection("Channels");
});

Meteor.methods({
    triggered: function () {
        console.log('Message received!');
    },
    hallo: function () {
        console.log('dikke woemie');
    }
});

Meteor.publish('users', function() {

    return Meteor.users.find();

});
Meteor.publish('questions', function() {
    return QuizQuestions.find();
});