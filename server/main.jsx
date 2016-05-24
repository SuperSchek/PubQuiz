import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Accounts.config({
        forbidClientAccountCreation : false
    });
});

Meteor.methods({

});