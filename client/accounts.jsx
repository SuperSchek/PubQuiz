/**
 * Created by jorrespijker on 10-05-16.
 */

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
    },
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    }
});

Template.username.helpers({
    passwordEmail: function(){
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address
        }
    }
});

Template.profiel.helpers({
    passwordEmail: function(){
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address
        }
    }
});

Template.profiel.events({
    'submit form': function(event, template) {
        var currentPassword,
            newPassword,
            newPasswordRepeated;

        currentPassword = template.find('#current-password');
        newPassword = template.find('#new-password');
        newPasswordRepeated = template.find('#new-password-repeated');

        // You will want to validate your passwords better than this
        if (newPassword !== newPasswordRepeated) {
            template.find('#form-messages').html("The new passwords don't match!");

            return false;
        }

        Accounts.changePassword(currentPassword, newPassword, function(error) {
            if (error) {
                message = 'There was an issue: ' + error.reason;
            } else {
                message = 'You reset your password!'
            }
        });

        // Inform the user.
        template.find('#form-messages').html(message);

        return false;
    }
});

Template.logout.events({
    'click .logout': function(event){
        console.log("hello");
        event.preventDefault();
        Meteor.logout();
    }
});

Template.topbarMobile.events({
    "click .dropdown-toggle":function(event){
        $(".dropdown").toggle();
    }
});

Template.topbarDesktop.events({
    "click .dropdown-toggle":function(event){
        $(".dropdown").toggle();
    }
});


Template.logindesktop.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});

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
            required: "Voer je email adres in",
            email: "Voer een juist email adres in"
        },
        password: {
            required: "Voer je wachtwoord in",
            minlength: "Wachtwoord moet minstens {0} karakters bevatten."
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