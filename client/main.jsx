import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';



// Router.onBeforeAction(animateContentOut);

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
            console.log('some action happened!');
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
            console.log('some action happenedeeeeee!');
            document.getElementById('login-module').className = "show";
            document.getElementById('register-module').className = "hidden";
        }
    }
});