import { Meteor } from 'meteor/meteor';
var currentQuestion;

var quizArray = [
    {
        question: "Wie wordt koning/koningin op het moment dat Willem-Alexander komt te overlijden?",
        answers: [
            {
                answer: "Prinses Amalia",
                punten: false,
                rendered: false
            },
            {
                answer: "Iemand anders",
                punten: false,
                rendered: false
            },
            {
                answer: "Prins Constantijn",
                punten: false,
                rendered: false
            },
            {
                answer: "Koningin Maxima",
                uitleg: 'Als prinses Amalia door erfopvolging koningin wordt en zij is nog geen achttien jaar, dan wordt haar moeder, koningin Máxima, benoemd tot regent van het koninkrijk. Dat heeft de Rijksvoorlichtingsdienst in 2013 bepaald.',
                punten: true,
                rendered: false
            }
        ],
        picture: "willem.png",
        enabled:true
    },
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
                uitleg: 'zonnestelsel.png',
                punten: true,
                rendered: false
            }
        ],
        picture: "stars.png",
        enabled:true
    },
    {
        question: "Welke club speelt er in onderstaand stadion?",
        answers: [
            {
                answer: "Vfl Wolfsburg",
                punten: false,
                rendered: false
            },
            {
                answer: "Olympique Marseille",
                punten: false,
                rendered: false
            },
            {
                answer: "PSV",
                punten: false,
                rendered: false
            },
            {
                answer: "Seattle Sounders FC",
                uitleg: 'CenturyLink Field (vroeger Seahawks Stadium en Qwest Field) is een multifunctioneel stadion, waarin 67.000 zitplaatsen zijn, dit kan worden uitgebreid naar 72.000 bij speciale evenementen. Het stadion wordt gebruikt door twee sportteams uit de stad Seattle. Seattle Sounders FC dat uitkomt in de Major League Soccer en Seattle Seahawks dat speelt in de NFL.',
                punten: true,
                rendered: false
            }
        ],
        picture: "stadium.png",
        enabled:true
    },
    {
        question: "Wie is deze basketballer?",
        answers: [
            {
                answer: "Shaquille O'Neal",
                punten: false,
                rendered: false
            },
            {
                answer: "Stephen Curry",
                punten: false,
                rendered: false
            },
            {
                answer: "Lebron James",
                punten: false,
                rendered: false
            },
            {
                answer: "Kobe Bryant",
                uitleg: 'Kobe Bean Bryant (Philadelphia (Pennsylvania), 23 augustus 1978) is een Amerikaans voormalig basketballer. Hij speelde zijn hele twintigjarige loopbaan bij de Los Angeles Lakers, waarmee hij vijf keer kampioen werd van de National Basketball Association (NBA).',
                punten: true,
                rendered: false
            }
        ],
        picture: "basketball.png",
        enabled:true
    },
    {
        question: "Wie is deze filosoof?",
        answers: [
            {
                answer: "Hadrianus",
                punten: false,
                rendered: false
            },
            {
                answer: "Aristoteles",
                punten: false,
                rendered: false
            },
            {
                answer: "Plato",
                punten: false,
                rendered: false
            },
            {
                answer: "Socrates",
                uitleg: 'Hij wordt beschouwd als een van de stichters van de westerse filosofie, al liet hij zelf geen geschriften na. Hij is bekend geworden door de verslagen van zijn studenten, met name die van Plato en Xenophon, en door de toneelstukken van zijn tijdgenoot, Aristophanes.',
                punten: true,
                rendered: false
            }
        ],
        picture: "filosoof.png",
        enabled:true
    },
    {
        question: "Welk land is aangegeven op de kaart?",
        answers: [
            {
                answer: "Colombia",
                punten: false,
                rendered: false
            },
            {
                answer: "Ecuador",
                punten: false,
                rendered: false
            },
            {
                answer: "Paraguay",
                punten: false,
                rendered: false
            },
            {
                answer: "Bolivia",
                uitleg: 'Bolivia, volledig de Plurinationale Staat Bolivia (Spaans: Estado Plurinacional de Bolivia) is een republiek in Zuid-Amerika die grenst aan Peru, Brazilië, Paraguay, Argentinië en Chili.',
                punten: true,
                rendered: false
            }
        ],
        picture: "land.png",
        enabled:true
    },
    {
        question: "Welk film is de best verdienende film ooit?",
        answers: [
            {
                answer: "The Avengers",
                punten: false,
                rendered: false
            },
            {
                answer: "Gone with the wind",
                punten: false,
                rendered: false
            },
            {
                answer: "Titanic",
                punten: false,
                rendered: false
            },
            {
                answer: "Avatar",
                uitleg: 'Met $2,787,965,087 is Avatar de best verdienende film ooit.',
                punten: true,
                rendered: false
            }
        ],
        picture: "cinema.png",
        enabled:true
    },
    {
        question: "Welk nummer is NIET van Michael Jackson?",
        answers: [
            {
                answer: "Bad",
                punten: false,
                rendered: false
            },
            {
                answer: "Black or White",
                punten: false,
                rendered: false
            },
            {
                answer: "Speed Demon",
                punten: false,
                rendered: false
            },
            {
                answer: "Earth Wind and Fire",
                uitleg: 'Earth, Wind & Fire is een Amerikaanse band die soul, funk, jazz- en discomuziek maakt – en ook verschillende muziekstijlen combineert – met prominente rollen voor percussie, blazers, kalimba, bas en zang. De band was vooral in de jaren zeventig populair.',
                punten: true,
                rendered: false
            }
        ],
        picture: "michael.png",
        enabled:true
    },
    {
        question: "Van welk automerk is dit het logo?",
        answers: [
            {
                answer: "Chevrolet",
                punten: false,
                rendered: false
            },
            {
                answer: "Buick",
                punten: false,
                rendered: false
            },
            {
                answer: "Rolls Royce",
                punten: false,
                rendered: false
            },
            {
                answer: "Cadillac",
                uitleg: "Cadillac is een Amerikaans merk van luxeauto's. Sinds 1909 behoort het merk tot het General Motors-concern. Cadillacs worden wereldwijd verkocht. De belangrijkste afzetgebieden zijn de Verenigde Staten, Canada en China. <br><br>Cadillac is het oudste Amerikaanse automerk na Buick, en ook wereldwijd is het een van de oudste. Cadillac staat bekend om zijn innovatie, hoge kwaliteit en veel luxe. In België en Nederland zijn respectievelijk zes en vier dealers actief.",
                punten: true,
                rendered: false
            }
        ],
        picture: "logoquiz.png",
        enabled:true
    },
    {
        question: "Welke vergeten groente is dit?",
        answers: [
            {
                answer: "Witte raapjes",
                punten: false,
                rendered: false
            },
            {
                answer: "Suikerwortel",
                punten: false,
                rendered: false
            },
            {
                answer: "Wortel",
                punten: false,
                rendered: false
            },
            {
                answer: "Pastinaak",
                uitleg: 'De pastinaak is een circa 20 cm lang wortelgewas met een zoete anijsachtige smaak en een crème-witte kleur. Door de lengte van de penwortel is de groente niet geschikt voor teelt op kleigronden. De pastinaak wordt doorgaans in de tweede helft van april gezaaid.',
                punten: true,
                rendered: false
            }
        ],
        picture: "groente.png",
        enabled:true
    }
];

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.config({
        forbidClientAccountCreation : false
    });
    Channels = new Mongo.Collection("Channels");
    Teams = new Mongo.Collection("Teams");
    QuestionsMeta = new Mongo.Collection("currentQuestion");
});

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
            QuestionsMeta.insert({"current": currentQuestion, "currentNumber": currentQuestionNumber, "orderArray": arr, "timer": 0, "afteller": 0});
            QuizQuestions.update(currentQuestion, {$set: {"enabled": false}});
        } else {
            QuestionsMeta.remove({});
            QuestionsMeta.insert({"current": "Quiz end"});
        }
    },
    'reset quiz': function () {
        QuizQuestions.remove({});

        for (var q = 0; q < quizArray.length; q++) {
            QuizQuestions.insert(quizArray[q]);
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