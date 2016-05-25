import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });
    // new Mongo.Collection("Channels");
});

Meteor.methods({

});