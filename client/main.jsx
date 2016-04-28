import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import 'routes.jsx';

import {test} from '../db/main.js';

animateContentOut = function() {
    $('#one').removeClass("animated fadeIn");
    return $('footer').addClass("hide");
};

// Router.onBeforeAction(animateContentOut);