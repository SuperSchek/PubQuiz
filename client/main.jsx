import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

Meteor.startup(() => {
    QuizQuestions = new Mongo.Collection("quiz");
    QuizQuestions.insert(
        {
            question: "Wat is de vijfde planeet in ons zonnestelsel gemeten vanaf de zon?",
            answers: [
                {
                    answer: "Venus",
                    punten: false,
                    rendered: false
                },
                {
                    answer: "Mars",
                    punten: false,
                    rendered: false
                },
                {
                    answer: "Saturnus",
                    punten: false,
                    rendered: false
                },
                {
                    answer: "Jupiter",
                    uitleg: '<img src="../images/zonnestelsel.png" width="100%"/>',
                    punten: true,
                    rendered: false
                }
            ],
            picture: "<img src='../images/stars.png' width='100%'/>",
            enabled:true
        }
    );
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
            document.getElementById('register-module').className = "hidden";
        }
    }
});