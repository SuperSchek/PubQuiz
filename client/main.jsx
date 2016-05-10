import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

// Router.onBeforeAction(animateContentOut);

Meteor.startup(() => {
});


function animatieClass() {
    document.getElementById('start-screen').className = "animatieOut";
}