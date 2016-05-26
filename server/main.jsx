import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });
    Channels = new Mongo.Collection("Channels");
});

var arr = [];
var numEnabled = 0;

Meteor.methods({
    'get question': function() {
        console.log('question get');

        var quizLength = QuizQuestions.find().count();

        for (var i = 0; i < quizLength; i++) {
            if (QuizQuestions.find().fetch()[i].enabled == true) {
                numEnabled++;
            }
        }

        for (var j = 0; j < numEnabled; j++) {
            do { var randomNum = Math.floor(Math.random() * quizLength); }
            while (QuizQuestions.find().fetch()[randomNum].enabled == false);
            console.log('render vraag: ' + randomNum)
        }
        QuizQuestions.find().fetch()[randomNum].enabled = false;

        console.log(numEnabled);
    }

//     socket.on('question request', function(quiz) {
//     // Empty the serverQuiz array so we're ready to receive the next round and Initialize numEnabled to 0..
//     serverQuiz = [];
//     serverQuiz = quiz;
//
//     // Set numEnabled to the total amount of questions left.
//     // (questions with enabled set to true)
//     for (var i = 0; i < serverQuiz.length; i++) {
//         if (serverQuiz[i].enabled == true) {
//             numEnabled++;
//         }
//     }
//
//     for (var j = 0; j < numEnabled; j++) {
//         do { var randomNum = Math.floor(Math.random() * serverQuiz.length); }
//         while (serverQuiz[randomNum].enabled == false);
//         io.sockets.emit('render question', randomNum);
//     }
//     serverQuiz[randomNum].enabled = false;
//     io.sockets.emit('update quiz', serverQuiz);
// });
});

// Collections
Meteor.publish('users', function() {
    return Meteor.users.find();
});
Meteor.publish('questions', function() {
    return QuizQuestions.find();
});
Meteor.publish('channels', function() {
    return Channels.find();
});