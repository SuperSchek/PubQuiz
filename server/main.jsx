import { Meteor } from 'meteor/meteor';
import { QuizQuestions } from '../db/quiz.js';

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
    }
});