Channels = new Mongo.Collection("Channels");
// Create new Collection for Quiz Questions
QuizQuestions = new Mongo.Collection("quiz");

// Empty the Collection to remove old stuff
QuizQuestions.remove({});


// Insert all Questions into a document in the QuizQuesions Collection.
// Questions can be retrieved with QuizQuestions.fetchOne()[Number_in_array];
// QuizQuestions.insert([
//     {
//         question: "Wie wordt koning/koningin op het moment dat Willem-Alexander komt te overlijden?",
//         answers: [
//             {
//                 answer: "Prinses Amalia",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Iemand anders",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Prins Constantijn",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Koningin Maxima",
//                 uitleg: 'Als prinses Amalia door erfopvolging koningin wordt en zij is nog geen achttien jaar, dan wordt haar moeder, koningin Máxima, benoemd tot regent van het koninkrijk. Dat heeft de Rijksvoorlichtingsdienst in 2013 bepaald.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/willem.png' width='100%' height='100%' />",
//         enabled:true
//     },
//     {
//         question: "Wat is de vijfde planeet in ons zonnestelsel gemeten vanaf de zon?",
//         answers: [
//             {
//                 answer: "Venus",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Mars",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Saturnus",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Jupiter",
//                 uitleg: '<img src="../images/zonnestelsel.png" width="100%"/>',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/stars.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Welke club speelt er in onderstaand stadion?",
//         answers: [
//             {
//                 answer: "Vfl Wolfsburg",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Olympique Marseille",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "PSV",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Seattle Sounders FC",
//                 uitleg: 'CenturyLink Field (vroeger Seahawks Stadium en Qwest Field) is een multifunctioneel stadion, waarin 67.000 zitplaatsen zijn, dit kan worden uitgebreid naar 72.000 bij speciale evenementen. Het stadion wordt gebruikt door twee sportteams uit de stad Seattle. Seattle Sounders FC dat uitkomt in de Major League Soccer en Seattle Seahawks dat speelt in de NFL.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/stadium.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Wie is deze basketballer?",
//         answers: [
//             {
//                 answer: "Shaquille O'Neal",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Stephen Curry",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Lebron James",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Kobe Bryant",
//                 uitleg: 'Kobe Bean Bryant (Philadelphia (Pennsylvania), 23 augustus 1978) is een Amerikaans voormalig basketballer. Hij speelde zijn hele twintigjarige loopbaan bij de Los Angeles Lakers, waarmee hij vijf keer kampioen werd van de National Basketball Association (NBA).',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/basketball.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Wie is deze filosoof?",
//         answers: [
//             {
//                 answer: "Hadrianus",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Aristoteles",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Plato",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Socrates",
//                 uitleg: 'Hij wordt beschouwd als een van de stichters van de westerse filosofie, al liet hij zelf geen geschriften na. Hij is bekend geworden door de verslagen van zijn studenten, met name die van Plato en Xenophon, en door de toneelstukken van zijn tijdgenoot, Aristophanes.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/filosoof.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Welk land is aangegeven op de kaart?",
//         answers: [
//             {
//                 answer: "Colombia",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Ecuador",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Paraguay",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Bolivia",
//                 uitleg: 'Bolivia, volledig de Plurinationale Staat Bolivia (Spaans: Estado Plurinacional de Bolivia) is een republiek in Zuid-Amerika die grenst aan Peru, Brazilië, Paraguay, Argentinië en Chili.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/land.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Welk film is de best verdienende film ooit?",
//         answers: [
//             {
//                 answer: "The Avengers",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Gone with the wind",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Titanic",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Avatar",
//                 uitleg: '<img src="../images/avatar.png" width="100%"/><br><br>Met $2,787,965,087 is Avatar de best verdienende film ooit.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/cinema.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Welk nummer is NIET van Michael Jackson?",
//         answers: [
//             {
//                 answer: "Bad",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Black or White",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Speed Demon",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Earth, Wind & Fire",
//                 uitleg: 'Earth, Wind & Fire is een Amerikaanse band die soul, funk, jazz- en discomuziek maakt – en ook verschillende muziekstijlen combineert – met prominente rollen voor percussie, blazers, kalimba, bas en zang. De band was vooral in de jaren zeventig populair.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/michael.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Van welk automerk is dit het logo?",
//         answers: [
//             {
//                 answer: "Chevrolet",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Buick",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Rolls Royce",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Cadillac",
//                 uitleg: "Cadillac is een Amerikaans merk van luxeauto's. Sinds 1909 behoort het merk tot het General Motors-concern. Cadillacs worden wereldwijd verkocht. De belangrijkste afzetgebieden zijn de Verenigde Staten, Canada en China. <br><br>Cadillac is het oudste Amerikaanse automerk na Buick, en ook wereldwijd is het een van de oudste. Cadillac staat bekend om zijn innovatie, hoge kwaliteit en veel luxe. In België en Nederland zijn respectievelijk zes en vier dealers actief.",
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/logoquiz.png' width='100%'/>",
//         enabled:true
//     },
//     {
//         question: "Welke vergeten groente is dit?",
//         answers: [
//             {
//                 answer: "Witte raapjes",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Suikerwortel",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Wortel",
//                 punten: false,
//                 rendered: false
//             },
//             {
//                 answer: "Pastinaak",
//                 uitleg: 'De pastinaak is een circa 20 cm lang wortelgewas met een zoete anijsachtige smaak en een crème-witte kleur. Door de lengte van de penwortel is de groente niet geschikt voor teelt op kleigronden. De pastinaak wordt doorgaans in de tweede helft van april gezaaid.',
//                 punten: true,
//                 rendered: false
//             }
//         ],
//         picture: "<img src='../images/groente.png' width='100%'/>",
//         enabled:true
//     }
// ]);
