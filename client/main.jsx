import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

Meteor.subscribe('questions');
Meteor.subscribe('channels');
Meteor.subscribe('users');
Meteor.subscribe('teams');
Meteor.subscribe('currentQuestion');

Meteor.startup(() => {
    QuizQuestions = new Mongo.Collection("quiz");
    Channels = new Mongo.Collection("Channels");
    Teams = new Mongo.Collection("Teams");
    QuestionsMeta = new Mongo.Collection("currentQuestion");
});

Template.mobcode.events({
    'click #meteortest': function test(event){
        event.preventDefault();
        console.log("You clicked a #player element");
        Meteor.call('hallo');
        // document.getElementById('start-container').innerHTML = "<h2>TEST</h2>"
    }
});

Template.vragen.helpers({
    'quizSize': function () {
        return QuizQuestions.find().count();
    },
    'vraag': function () {
        var currentQuestionId = QuestionsMeta.findOne().current;
        return QuizQuestions.find({"_id": currentQuestionId}).fetch()[0].question;
    }
});

Template.vragen.events({
    'click #leaderboard-title': function(event){
        event.preventDefault();
        Meteor.call('get question');
    }
});

Template.child.events({
    'click button': function(e, tpl){
        tpl.data.onClick(e);
    }
});

Template.parent.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "hidden";
            document.getElementById('register-module').className = "show";
        }
    }
});

Template.childreg.events({
    'click button': function(e, tpl){
        tpl.data.onClick(e);
    }
});

Template.parentreg.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "show";
            document.getElementById('register-module').className = "hidden"
        }
    }
});

Template.roomcode.onRendered(function() {
    // console.log("LALA");
    // $('input').bind('this', function() {
    //     if ('input'.value.length >= $(this).attr('maxlength')) {
    //         console.log("first");
    //         $('input').next().select();
    //     }
    //     if ('input'.value.length == 0) {
    //         console.log("second");
    //         $('input').prev().select();
    //     }
    // });
});

var code1;
var code2;
var code3;
var code4;

var codeX;

codeX = Number;
name = Number;
get_placement_id = function(doc) { return doc.name; };

// Channels = new Mongo.Collection("Channels");

Template.roomcode.events({
    'submit form': function(event){
        event.preventDefault();
        code1 = document.getElementById('code1').value;
        code2 = document.getElementById('code2').value;
        code3 = document.getElementById('code3').value;
        code4 = document.getElementById('code4').value;
        codeX = code1 + code2 + code3 + code4;
        codeX = parseInt(codeX);
        console.log(codeX);
        findCodeX = Channels.find({code: codeX}).count();

        if (findCodeX => 1){
            console.log("Room exist.");

            gebruiker = Meteor.userId(); //het id van de gebruiker die is ingelogd
            kfcx = Channels.findOne({code: codeX}, {fields: {name: 1, code: 1, _id: 0}}); //find statement met als resultaat een object uit de Channels
            Meteor.users.update(gebruiker, {$set: {"profile": kfcx}});  //importeren van de gevonden channelgegevens
            // Route.go("/lobby");
            
        } else {
            console.log("Room doesn't exist.");
        }



        Meteor.users.update(
            { _id: this._id },
            {$set:
                { room: codeX }
            },
            // Meteor.users.update(gebruiker, {$set: {"profile.kamercode": kamercijfer}});
        );
    }
});



Template.lobby.helpers({
    team: function() {
        return Teams.find();
    }
});


Template.lobby.events({
    'submit #createTeam': function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var gebruiker = Meteor.user().emails[0].address;
        if (document.getElementById('questionmaster').checked) {
            Teams.insert({
                name: name,
                questionmaster: gebruiker
            });
        } else if (document.getElementById('playerthree').checked) {
            Teams.insert({
                name: name,
                playerthree: gebruiker
            });
        } else if (document.getElementById('playerfour').checked) {
            Teams.insert({
                name: name,
                playerfour: gebruiker
            });
        }
    },
    'click #joinTeam': function() {
        console.log("YEEHAA");
        // var name = document.getElementById('joinTeam').innerHTML;
        var kut = $("#name").val();
        console.log(kut);
    }
    });