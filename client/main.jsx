import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

Meteor.startup(() => {
    QuizQuestions = new Mongo.Collection("quiz");
});

Template.vragen.events({
    'click #leaderboard-title': function(event){
        event.preventDefault();
        var quizLength = QuizQuestions.find().count();
        var arr = [];
        while(arr.length < quizLength ) {
            var randomNumber = Math.floor(Math.random() * quizLength);
            var found = false;
            for (var i = 0; i < arr.length; i++) {
                if(arr[i] == randomNumber) {
                    found = true;
                    break
                }
            }
            if (!found) {
                arr[arr.length] = randomNumber;
            }
            document.getElementById('question').innerHTML = QuizQuestions.find().fetch()[randomNumber].question;
        }
    }
});

//
// var arr = [];
//
// while(arr.length < 4){
//     var randomnumber = Math.floor(Math.random() * 4);
//     var found = false;
//     for(var i = 0; i < arr.length; i++) {
//         if(arr[i] == randomnumber) {
//             found=true;break
//         }
//     }
//     if(!found) {
//         arr[arr.length] = randomnumber;
//     }
// }

Template.child.events({
    'click button': function(e, tpl){
        tpl.data.onClick(e);
    }
});
Template.parent.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "hidden";
            document.getElementById('register-module').className = "show"
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


if (this.value.length == 0) {
    $(this).prev().select();
}

Channels = new Mongo.Collection("Channels");

Template.roomcode.events({
    'submit form': function(event){
        event.preventDefault();
        code1 = document.getElementById('code1').value;
        code2 = document.getElementById('code2').value;
        code3 = document.getElementById('code3').value;
        code4 = document.getElementById('code4').value;
        codeX = code1 + code2 + code3 + code4;
        console.log(codeX);
        Meteor.users.update(
            { _id: this._id },
            {$set:
                { room: codeX }
            },
            console.log("hey")
        );
    }
});

Template.mobcode.events({
    'click .meteortest': function(){
        console.log("You clicked a #player element");
    }
});