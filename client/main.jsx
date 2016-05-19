import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

var kamerNummer = 0;

Meteor.startup(() => {
    QuizQuestions = new Mongo.Collection("quiz");
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

Template.roomcode.onRendered = function() {
    $('input').bind('input', function() {
        if (this.value.length >= $(this).attr('maxlength')) {
            $(this).next().select();
        }

        if (this.value.length == 0) {
            $(this).prev().select();
        }
    });
};


//Rooms creating
Channels = new Mongo.Collection("Channels");
