var kamernummertje = 0;
var kamerCodering = 0;
var gebruiker;



//Create kamerNumber

// device detection and set isMobile accordingly.
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    isMobile = true;

function kamerNumber() {
    var kammernummertijdelijk = Channels.find().count() + 1;
    var kamernummerVinden = Channels.find({roomNumber: kammernummertijdelijk}).count();
    while (kamernummerVinden >= 1) {
        kammernummertijdelijk = kammernummertijdelijk - 1;
        kamernummerVinden = Channels.find({roomNumber: kammernummertijdelijk}).count();
    }
    kamernummertje = kammernummertijdelijk;
    return kamernummertje;
}

//Create kamerCode
function kamerCode() {

    var kamerGetal  = Math.floor(Math.random() * 9000) + 1000;
    var getalVinden = Channels.find({roomLock: kamerGetal}).count();

    while(getalVinden >= 1) {
        kamerGetal = Math.floor(Math.random() * 9000) + 1000;
    }

    kamerCodering = Number(kamerGetal);
    return kamerCodering;
}

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar,
            team: "",
            score: 0
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("roomcode"); // User succeeds
            }
        });
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("roomcode"); // User succeeds
            }
        });
    },
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else {
                Router.go("roomcode"); // User succeeds
            }
        });
    }
});

Template.startscreen.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
            }
        });
    },
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
    'click #btn-createLobby': function () {
        event.preventDefault();
        createRoom();
    }
});

Template.username.helpers({
    passwordEmail: function(){
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address
        }
    }
});

Template.profiel.helpers({
    passwordEmail: function(){
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address
        }
    }
});

Template.profiel.events({
    'submit form': function(event, template) {
        var currentPassword,
            newPassword,
            newPasswordRepeated;

        currentPassword = template.find('#current-password');
        newPassword = template.find('#new-password');
        newPasswordRepeated = template.find('#new-password-repeated');

        // You will want to validate your passwords better than this
        if (newPassword !== newPasswordRepeated) {
            template.find('#form-messages').html("The new passwords don't match!");

            return false;
        }

        Accounts.changePassword(currentPassword, newPassword, function(error) {
            if (error) {
                message = 'There was an issue: ' + error.reason;
            } else {
                message = 'You reset your password!'
            }
        });

        // Inform the user.
        template.find('#form-messages').html(message);

        return false;
    }
});


Template.logout.events({
    'click .logout': function(event){
        event.preventDefault();
        console.log(isMobile);
        if(isMobile == false){
            rcdi = Meteor.user().profile.roomLock;
            console.log(rcdi);
            rcdistring = String(rcdi);
            Channels.remove({_id: rcdistring});
            Meteor.logout();
            Router.go("/");
        } else{
            Meteor.logout();
            Router.go("/");
        }

        // //----------moeten in een IF statement voor desktop alleen komen ------
        //     //rcdi = Meteor.user().profile.kamercode;
        //     //rcdistring = String(rcdi);
        //     //Channels.remove({_id: rcdistring});
        // //-----------
        // event.preventDefault();
        // Meteor.logout();
    }
});

Template.topbarMobile.events({
    "click .dropdown-toggle":function(event){
        $(".dropdown").toggle();
    }
});

Template.topbarDesktop.events({
    "click .dropdown-toggle":function(event){
        $(".dropdown").toggle();
    }
});
Template.topbarLobby.events({
    "click .dropdown-toggle":function(event){
        $(".dropdown").toggle();
    }
});


Template.logindesktop.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});

Template.registerdesktop.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                //Create room
                createRoom();
            }
        });
    }
});

Template.logindesktop.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (error) {
                console.log(error.reason);
            } else {
                //Create room
                createRoom();
            }
        });
    }
});

function createRoom() {
    kamerNumber();
    kamerCode();
    Channels.insert({
        "_id"       : "1234567890",
        "roomLock"  : kamerCodering,
        "roomNumber": kamernummertje,
        "roomhost"  : Meteor.user().emails[0].address,
        "questionsMeta": {
            "current"      : 0,
            "currentNumber": 0,
            "orderArray"   : 0,
            "timer"        : 0,
            "afteller"     : 0
        },
        "numberOfTeams"    : 0,
        "teams" : {},
        "questions":  {
            "vraag 1": {
                "question": "Wie wordt koning/koningin op het moment dat Willem-Alexander komt te overlijden?",
                "uitleg"  : 'Als prinses Amalia door erfopvolging koningin wordt en zij is nog geen achttien jaar, dan wordt haar moeder, koningin Máxima, benoemd tot regent van het koninkrijk. Dat heeft de Rijksvoorlichtingsdienst in 2013 bepaald.',
                "picture": "<img src='../images/willem.png' width='100%' height='100%' />",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer"  : "Prinses Amalia",
                        "punten"  : false,
                        "rendered": false
                    },
                    "b": {
                        "answer"  : "Iemand anders",
                        "punten"  : false,
                        "rendered": false
                    },
                    "c": {
                        "answer"  : "Prins Constantijn",
                        "punten"  : false,
                        "rendered": false
                    },
                    "d": {
                        "answer"  : "Koningin Maxima",
                        "punten"  : true,
                        "rendered": false
                    }
                }
            },
            "vraag 2": {
                "question": "Wat is de vijfde planeet in ons zonnestelsel gemeten vanaf de zon?",
                "uitleg": '<img src="../images/zonnestelsel.png" width="100%"/>',
                "picture": "<img src='../images/stars.png' width='100%'/>",
                "enabled": true,
                "answers": {
                    "a": {
                        "answer": "Venus",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Mars",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Saturnus",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Jupiter",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 3": {
                "question": "Welke club speelt er in onderstaand stadion?",
                "uitleg": 'CenturyLink Field (vroeger Seahawks Stadium en Qwest Field) is een multifunctioneel stadion, waarin 67.000 zitplaatsen zijn, dit kan worden uitgebreid naar 72.000 bij speciale evenementen. Het stadion wordt gebruikt door twee sportteams uit de stad Seattle. Seattle Sounders FC dat uitkomt in de Major League Soccer en Seattle Seahawks dat speelt in de NFL.',
                "picture": "<img src='../images/stadium.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Vfl Wolfsburg",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Olympique Marseille",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "PSV",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Seattle Sounders FC",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 4": {
                "question": "Wie is deze basketballer?",
                "uitleg": 'Kobe Bean Bryant (Philadelphia (Pennsylvania), 23 augustus 1978) is een Amerikaans voormalig basketballer. Hij speelde zijn hele twintigjarige loopbaan bij de Los Angeles Lakers, waarmee hij vijf keer kampioen werd van de National Basketball Association (NBA).',
                "picture": "<img src='../images/basketball.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Shaquille O'Neal",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Stephen Curry",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Lebron James",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Kobe Bryant",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 5": {
                "question": "Wie is deze filosoof?",
                "uitleg": 'Hij wordt beschouwd als een van de stichters van de westerse filosofie, al liet hij zelf geen geschriften na. Hij is bekend geworden door de verslagen van zijn studenten, met name die van Plato en Xenophon, en door de toneelstukken van zijn tijdgenoot, Aristophanes.',
                "picture": "<img src='../images/filosoof.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Hadrianus",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Aristoteles",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Plato",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Kobe Bryant",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 6": {
                "question": "Welk land is aangegeven op de kaart?",
                "uitleg": 'Bolivia, volledig de Plurinationale Staat Bolivia (Spaans: Estado Plurinacional de Bolivia) is een republiek in Zuid-Amerika die grenst aan Peru, Brazilië, Paraguay, Argentinië en Chili.',
                "picture": "<img src='../images/land.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Colombia",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Ecuador",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Paraguay",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Bolivia",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 7": {
                "question": "Welk film is de best verdienende film ooit?",
                "uitleg": '<img src="../images/avatar.png" width="100%"/><br><br>Met $2,787,965,087 is Avatar de best verdienende film ooit.',
                "picture": "<img src='../images/cinema.png' width='100%'/>",
                "enabled": true,
                "answers": {
                    "a": {
                        "answer": "The Avengers",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Gone with the wind",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Titanic",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Avatar",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 8": {
                "question": "Welk nummer is NIET van Michael Jackson?",
                "uitleg": 'Earth, Wind & Fire is een Amerikaanse band die soul, funk, jazz- en discomuziek maakt – en ook verschillende muziekstijlen combineert – met prominente rollen voor percussie, blazers, kalimba, bas en zang. De band was vooral in de jaren zeventig populair.',
                "picture": "<img src='../images/michael.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Bad",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Black or White",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Speed Demon",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Earth Wind and Fire",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 9": {
                "question": "Van welk automerk is dit het logo?",
                "uitleg": "Cadillac is een Amerikaans merk van luxeauto's. Sinds 1909 behoort het merk tot het General Motors-concern. Cadillacs worden wereldwijd verkocht. De belangrijkste afzetgebieden zijn de Verenigde Staten, Canada en China. <br><br>Cadillac is het oudste Amerikaanse automerk na Buick, en ook wereldwijd is het een van de oudste. Cadillac staat bekend om zijn innovatie, hoge kwaliteit en veel luxe. In België en Nederland zijn respectievelijk zes en vier dealers actief.",
                "picture": "<img src='../images/logoquiz.png' width='100%'/>",
                "enabled": true,
                "answers": {
                    "a": {
                        "answer": "Chevrolet",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Buick",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Rolls Royce",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Cadillac",
                        "punten": true,
                        "rendered": false
                    }
                }
            },
            "vraag 10": {
                "question": "Welke vergeten groente is dit?",
                "uitleg": 'De pastinaak is een circa 20 cm lang wortelgewas met een zoete anijsachtige smaak en een crème-witte kleur. Door de lengte van de penwortel is de groente niet geschikt voor teelt op kleigronden. De pastinaak wordt doorgaans in de tweede helft van april gezaaid.',
                "picture": "<img src='../images/groente.png' width='100%'/>",
                "enabled":true,
                "answers": {
                    "a": {
                        "answer": "Witte raapjes",
                        "punten": false,
                        "rendered": false
                    },
                    "b": {
                        "answer": "Suikerwortel",
                        "punten": false,
                        "rendered": false
                    },
                    "c": {
                        "answer": "Wortel",
                        "punten": false,
                        "rendered": false
                    },
                    "d": {
                        "answer": "Pastinaak",
                        "punten": true,
                        "rendered": false
                    }
                }
            }
        }
    });

    //doc is een copy van het object welke zojuist insert() is
    doc = Channels.findOne({_id: "1234567890"});
    //doc._id is het nieuwe _id veld (een object mag alleen op _id gewijzigd worden)
    doc._id = String(kamerCodering);
    //deze kloon inserten we in de Channels DB/collection
    Channels.insert(doc);
    //met deze kloon erin (met ons eigen _id veld, namelijk kamercode) kan het origineel verwijdert worden
    Channels.remove({_id: "1234567890"});

    //gebruiker is eigen ID van de host en deze krijgt ook de waardens van kamernummer en code mee. Op deze manier is een join gefaked
    //en kan de kamer aan deze gebruiker gekoppeld worden doormiddel van het kamernummer (_id).
    gebruiker = Meteor.userId();
    Meteor.users.update(gebruiker, {$set: {"profile": {
        "roomLock": kamerCodering,
        "roomNumber": kamernummertje
    }}});
    function getNumberOfTeams() {
        var gnot = JSON.stringify(Channels.findOne({_id: String(Meteor.user().profile.roomLock)}, {fields: {numberOfTeams: 1, _id: 0}}));
        gnot = gnot.substr(17);
        gnot = gnot.substr(0, gnot.length-1);
        gnot = parseInt(gnot);
        gnot = parseInt(gnot);
    };
    getNumberOfTeams();


    Router.go("lobby"); // User succeeds, naar de lobby
}


// Error Handling

$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "Voer je email adres in",
            email: "Voer een juist email adres in"
        },
        password: {
            required: "Voer je wachtwoord in",
            minlength: "Wachtwoord moet minstens {0} karakters bevatten."
        }
    }
});

Template.login.onRendered(function(){
    $('.login').validate();
});

Template.register.onRendered(function(){
    $('.register').validate();
});


Template.logindesktop.onRendered(function(){
    $('.login').validate();
});

Template.registerdesktop.onRendered(function(){
    $('.register').validate();
});
