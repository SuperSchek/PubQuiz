import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import {test} from '../db/main.js';

Router.route('/', function () {
    this.render('home');
});

Router.route('/one', function () {
    this.render('one');
});

function fadeContentIn() {
    document.getElementById('test').addClass("animated fadeIn");
}

// define this as a global onAfterAction so it happens all the time
Router.onAfterAction(fadeContentIn);
