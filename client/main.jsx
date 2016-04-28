import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

import {PubQuiz} from '../db/main.js';

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});