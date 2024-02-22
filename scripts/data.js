// ---------------------- variables -------------------

//game others (like language)
let appData = {};
appData.lang = 'en';
appData.strings = {
    welcome: {
        he: "משחק סיימון, טוב לראות אותך פה :)",
        en: "welcome to the simon game!!"
    },
    placeholder: {
        he: "שם שחקן",
        en: "player name"
    },
    startButton: {
        he: "התחל משחק",
        en: "start game"
    },
    hello: {
        he: "שלום",
        en: "hello"
    },
    level: {
        he: "שלב",
        en: "level"
    },

    maxScore:{
        he:"שלב שיא",
        en:"max score"
    },
    preScores:{
        he:"שיא קודם",
        en:"previous score"
    },

    popupSuccessH: {
        he: "כל הכבוד!",
        en: "Well done!"
    },
    popupSuccessP: {
        he: "סיימת 10 שלבים!!",
        en: "You finished successfully 10 levels!!"
    },
    popupFailureH: {
        he: "אאוצ'",
        en: "ouch"
    },
    popupFailureP: {
        he: "לא הצלחת הפעם :(",
        en: "You didn't make it this time"
    },
    popupTimeOverH: {
        he: "אופס",
        en: "oops"
    },
    popupTimeOverP: {
        he: "לא הספקת הפעם",
        en: "time over"
    },
    again: {
        he: "שחק שוב",
        en: "play again"
    },
    exit: {
        he: "יציאה",
        en: "exit"
    },
    extra: {
        he: "לשלב אקסטרה מהיר",
        en: "to extra speed"
    }
};


//game's buttons: yellow=0 green=1 blue=2 red=3 ♥
const buttons = [
    {
        index: 0,
        idButton: "buttonYellow0",
        color: "yellow",
        keyActiv: "up",
        keyCode: 38,
        sound: ""
    },
    {
        index: 1,
        idButton: "buttonGreen1",
        color: "green",
        keyActiv: "right",
        keyCode: 39,
        sound: ""
    },
    {
        index: 2,
        idButton: "buttonBlue2",
        color: "blue",
        keyActiv: "down",
        keyCode: 40,
        sound: ""
    },
    {
        index: 3,
        idButton: "buttonRed3",
        color: "red",
        keyActiv: "left",
        keyCode: 37,
        sound: ""
    },
];

//all button's elements ♥
const buttonsElements = document.querySelectorAll(".buttonGame");

let level = 0;  //current level
let speed = 600;  //game's speed

let arrLight = [];  //computer's array lights
let indexComputer;  //computer's current step
let intervalComputer;  //intervals computer's turn

let success = 0;  //count success
let failure = 0;  //count failure

let playerName;  //player's name
let indexPlayer = 0;  //player's current step
let indexClicked;  //current player button index
let intervalPlayer; //player's count down
let countIntervalPlayer;  //player's count down index

let intervalPopup;  //popup's count down
let countIntervalPopup;  //popup's count down index

let popupActElements = document.querySelectorAll(".popupAct");

let arrScores = [];


