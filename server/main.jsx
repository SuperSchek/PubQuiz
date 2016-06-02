import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });
    Channels = new Mongo.Collection("Channels");
    Teams = new Mongo.Collection("Teams");
    QuestionsMeta = new Mongo.Collection("currentQuestion");
});

var currentQuestion;

Meteor.methods({
    'get question': function() {
        var quizLength = QuizQuestions.find().count();
        var randomNum = Math.floor(Math.random() * quizLength);
        var numEnabled = 0;

        for (var i = 0; i < quizLength; i++) {
            if (QuizQuestions.find().fetch()[i].enabled == true) {
                numEnabled++;
            }
        }

        var currentQuestionNumber = quizLength - numEnabled + 1;
        if (numEnabled >= 1) {
            for (var j = 0; j < numEnabled; j++) {
                do { randomNum = Math.floor(Math.random() * quizLength); }
                while (QuizQuestions.find().fetch()[randomNum].enabled == false);
            }
            currentQuestion = QuizQuestions.find().fetch()[randomNum]._id;

            var arr = [];
            while(arr.length < 4){
                var randomnumber = Math.floor(Math.random() * 4);
                var found = false;
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] == randomnumber) {
                        found=true;break
                    }
                }
                if(!found) {
                    arr[arr.length] = randomnumber;
                }
            }
            QuestionsMeta.remove({});
            QuestionsMeta.insert({"current": currentQuestion, "currentNumber": currentQuestionNumber, "orderArray": arr});
            QuizQuestions.update(currentQuestion, {$set: {"enabled": false}});
        } else {
            QuestionsMeta.remove({});
            QuestionsMeta.insert({"current": "Quiz end"});
        }
    }
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
Meteor.publish('teams', function() {
    return Teams.find();
});
Meteor.publish('currentQuestion', function() {
    return QuestionsMeta.find();
});