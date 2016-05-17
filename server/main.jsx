import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });

    QuizQuestions = new Mongo.Collection("quiz");
});

Meteor.methods({
    triggered: function () {
        console.log('Message received!');
    }
});