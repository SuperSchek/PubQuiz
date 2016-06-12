// Insert all Questions into a document in the QuizQuesions Collection.
// Questions can be retrieved with QuizQuestions.fetchOne()[Number_in_array];
var quizArray = [
    {
        question: "Wat zijn de twee hoofdmappen van Meteor?",
        answers: [
            {
                answer: "frontend, backend",
                punten: false,
                rendered: false
            },
            {
                answer: "mongo, client",
                punten: false,
                rendered: false
            },
            {
                answer: "server, mongo",
                punten: false,
                rendered: false
            },
            {
                answer: "client, server",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe zorg je ervoor dat een variabel globaal is?",
        answers: [
            {
                answer: "var Name = 'John';",
                punten: false,
                rendered: false
            },
            {
                answer: "var(global) Name = 'John';",
                punten: false,
                rendered: false
            },
            {
                answer: "var.global(Name = 'John');",
                punten: false,
                rendered: false
            },
            {
                answer: "Name = 'John';",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe voeg je in Meteor iets in de database toe?",
        answers: [
            {
                answer: "Database.add({veld: 'test'});",
                punten: false,
                rendered: false
            },
            {
                answer: "Database.add(veld: 'test');",
                punten: false,
                rendered: false
            },
            {
                answer: "Database.insert(veld: 'test');",
                punten: false,
                rendered: false
            },
            {
                answer: "Database.insert({veld: 'test'});",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe zorg je ervoor dat een clickevent niet de pagina refresht?",
        answers: [
            {
                answer: "event.noRefresh();",
                punten: false,
                rendered: false
            },
            {
                answer: "click.noRefresh();",
                punten: false,
                rendered: false
            },
            {
                answer: "click.preventDefault();",
                punten: false,
                rendered: false
            },
            {
                answer: "event.preventDefault();",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Wat is functie van routes?",
        answers: [
            {
                answer: "Data ophalen",
                punten: false,
                rendered: false
            },
            {
                answer: "Data versturen",
                punten: false,
                rendered: false
            },
            {
                answer: "Data realtime heen en weer sturen",
                punten: false,
                rendered: false
            },
            {
                answer: "Linking tussen pagina’s",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe maak je een database aan?",
        answers: [
            {
                answer: "Database = new Mongo.database(‘database’);",
                punten: false,
                rendered: false
            },
            {
                answer: "Database = create Mongo.database(‘database’);",
                punten: false,
                rendered: false
            },
            {
                answer: "Database = create Mongo.collection(‘database’);",
                punten: false,
                rendered: false
            },
            {
                answer: "Database = new Mongo.collection(‘database’);",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe noem je de drie belangrijke commando’s om data te manipuleren?",
        answers: [
            {
                answer: "add, delete, change",
                punten: false,
                rendered: false
            },
            {
                answer: "insert, delete, update",
                punten: false,
                rendered: false
            },
            {
                answer: "add, remove, change",
                punten: false,
                rendered: false
            },
            {
                answer: "insert, remove, update",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe maak je een template in HTML aan?",
        answers: [
            {
                answer: "<template id='template'></template>",
                punten: false,
                rendered: false
            },
            {
                answer: "<script type='template' name='template'></script>",
                punten: false,
                rendered: false
            },
            {
                answer: "<script type='template' id='template'></script>",
                punten: false,
                rendered: false
            },
            {
                answer: "<template name='template'></template>",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Hoe kunnen we voor elk database object een template inladen?",
        answers: [
            {
                answer: "{{#for object}} {{> template}} {{/for}}",
                punten: false,
                rendered: false
            },
            {
                answer: "{{#while object}} {{> template}} {{/while}}",
                punten: false,
                rendered: false
            },
            {
                answer: "{{#for each object}} {{show: template}} {{/for}}",
                punten: false,
                rendered: false
            },
            {
                answer: "{{#each object}} {{> template}} {{/each}}",
                uitleg: "",
                punten: true,
                rendered: false
            }
        ],
        picture: "",
        enabled:true
    },
    {
        question: "Vul de lege plekken in?",
        answers: [
            {
                answer: "click, click, }, })",
                punten: false,
                rendered: false
            },
            {
                answer: "submit, event, ), })",
                punten: false,
                rendered: false
            },
            {
                answer: "submit, click, ), })",
                punten: false,
                rendered: false
            },
            {
                answer: "click, event, }, })",
                uitleg: '',
                punten: true,
                rendered: false
            }
        ],
        picture: "imgQuiz.png",
        enabled:true
    }
];

// Create new Collection for Quiz Questions
QuizQuestions = new Mongo.Collection("quiz");

// Empty the Collection to remove old stuff
QuizQuestions.remove({});

for (var q = 0; q < quizArray.length; q++) {
    QuizQuestions.insert(quizArray[q]);
}