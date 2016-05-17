import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });

    QuizQuestions = new Mongo.Collection("quiz");

    QuizQuestions.upsert(
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

Meteor.methods({
    triggered: function () {
        console.log('Message received!');
    }
});