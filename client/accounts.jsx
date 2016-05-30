kamernummertje = 0;
kamerCodering = 0;
var gebruiker;
//Create kamerNumber

function kamerNumber() {
    kamernummertje = Channels.find().count() + 1;
    return kamernummertje;
}

//Create kamerCode
function kamerCode() {

    var kamerGetal  = Math.floor(Math.random() * 9000) + 1000;
    var getalVinden = Channels.find({code: kamerGetal}).count();

    while(getalVinden >= 1) {
        kamerGetal = Math.floor(Math.random() * 9000) + 1000;
    }

    kamerCodering = Number(kamerGetal);
    return kamerCodering;
}

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar,
            team: ""
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

Template.startscreen.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
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

        //----------moeten in een IF statement voor desktop alleen komen ------
            //rcdi = Meteor.user().profile.kamercode;
            //rcdistring = String(rcdi);
            //Channels.remove({_id: rcdistring});
        //-----------
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
                //Create room
                kamerNumber();
                kamerCode();
                Channels.insert({
                    _id: "1234567890",
                    name: kamernummertje,
                    code: kamerCodering
                    //POWERUPS VOOR DE USERS
                    //powerUp1: 1,
                    //powerUp2: 1,
                    //powerUp3: 1
                });

                //doc is een copy van het object welke zojuist insert() is
                doc = Channels.findOne({_id: "1234567890"});
                //doc._id is het nieuwe _id veld (een object mag alleen op _id gewijzigd worden)
                doc._id = String(kamerCodering);
                //deze kloon inserten we in de Channels DB/collection
                Channels.insert(doc);
                //met deze kloon erin (met ons eigen _id veld, namelijk kamercode) kan het origineel verwijdert worden
                Channels.remove({_id: "1234567890"});

                //gebruiker is eigen ID van de host en deze krijgt ook de waardens van kamernummer en code mee. Op deze manier is een join gefaked
                //en kan de kamer aan deze gebruiker gekoppeld worden doormiddel van het kamernummer (_id).
                gebruiker = Meteor.userId();
                Meteor.users.update(gebruiker, {$set: {"profile.kamernummer": kamernummertje}});
                Meteor.users.update(gebruiker, {$set: {"profile.kamercode": kamerCodering}});
                Router.go("lobby"); // User succeeds, naar de lobby
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
                kamerNumber();
                kamerCode();
                Channels.insert({
                    _id: "1234567890",
                    name: kamernummertje,
                    code: kamerCodering,
                    //POWERUPS VOOR DE USERS
                    //powerUp1: 1,
                    //powerUp2: 1,
                    //powerUp3: 1
                });

                //doc is een copy van het object welke zojuist insert() is
                doc = Channels.findOne({_id: "1234567890"});
                //doc._id is het nieuwe _id veld (een object mag alleen op _id gewijzigd worden)
                doc._id = String(kamerCodering);
                //deze kloon inserten we in de Channels DB/collection
                Channels.insert(doc);
                //met deze kloon erin (met ons eigen _id veld, namelijk kamercode) kan het origineel verwijdert worden
                Channels.remove({_id: "1234567890"});

                //gebruiker is eigen ID van de host en deze krijgt ook de waardens van kamernummer en code mee. Op deze manier is een join gefaked
                //en kan de kamer aan deze gebruiker gekoppeld worden doormiddel van het kamernummer (_id).
                gebruiker = Meteor.userId();
                Meteor.users.update(gebruiker, {$set: {"profile.kamernummer": kamernummertje}});
                Meteor.users.update(gebruiker, {$set: {"profile.kamercode": kamerCodering}});
                Router.go("lobby"); // User succeeds, naar de lobby
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
