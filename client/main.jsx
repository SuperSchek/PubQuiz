import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

var kamerNummer = 0;

Meteor.startup(() => {
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

function animatieClass() {
    document.getElementById('start-screen').className = "animatieOut";
}

Template.parentreg.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "show";
            document.getElementById('register-module').className = "hidden";
        }
    }
});

//Rooms creating
Channels = new Mongo.Collection("Channels");



