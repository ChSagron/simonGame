/* ---------------- הקדמה ---------------- */
//כדי להגיע לחלקים הנדרשים בפרוייקט הוספנו להם סימון של לב
//כזה ♥
//כל מה שנשאר לעשות הוא לחפש את המופעים שלו
//בהצלחה!!




/* ---------------- game lang ---------------- */

//החזרת מחרוזת בשפה המתאימה
function getStr(strId) {
    return appData.strings[strId][appData.lang];
};

//אם שפת הדפדפן בעברית
if (navigator.language == 'he-IL') {
    appData.lang = 'he';
    document.querySelector("body").classList.add("rtl");
};



/* ---------------- main ---------------- */
Main();

function Main() {

    //if(location.pathname.indexOf("index.html")
    switch (document.title) {
        case "Simon Game":
            MainGame();
            break;
        case "Welcome":
            MainWelcome();
            break;
    }
}

function MainWelcome() {

    //הזרקת תוכן מתאים ♥
    document.querySelector("#welcome").innerHTML = getStr("welcome");
    document.getElementById("namePlayer").placeholder = getStr("placeholder");
    document.querySelector("#startButton").innerHTML = getStr("startButton");

    // כניסה לדף המשחק אחרי הזנת שם שחקן ♥
    document.querySelector("#startGame").onsubmit = function (e) {

        //מניעת שליחת הטופס
        e.preventDefault();

        //לכידת שם השחקן ♥
        playerName = document.querySelector("#namePlayer").value;
        //אם הוכנס שם
        if (playerName) {
            //שמירת לזכרון מקומי ♥
            localStorage.setItem("playerName", playerName);

            //למחוק
            //איחול כניסה
            // alert(`${getStr("hello")} ${playerName}!`);

            //מעבר לעמוד המשחק ♥
            window.location.href = "pages/index.html";
        }
        //אם לא הוכנס שם
        else alert("Please enter your name");

    }
}

function MainGame() {

    //הצמדת מאזין לחיצה ללחצנים ♥
    buttonsElements.forEach(element => {
        //למה לא עובד?
        // addEventListener("click", OnPlayerClick);
        element.onclick = OnPlayerClick;
    });

    //הצמדת מאזין לחיצה לכפתורי הפופאפים
    popupActElements.forEach(element => {
        // addEventListener("click", OnPlayerClick);
        element.onclick = OnPopupButton;
    });

    //הצמדת מאזין לחיצת מקלדת ♥
    document.onkeydown = OnPlayerKey;

    //לקיחת שם השחקן מהזכרון המקומי
    playerName = localStorage.getItem("playerName");
    //הזרקת שם השחקן לעמו המשחק
    document.getElementById("helloName").innerHTML = `${getStr("hello")} ${playerName}!`;

    //התחלת משחק- העלאת שלב והרצת משחק
    LevelUp();
    Game();
}




//------------ computer's turn -----------

//העלאת שלב - הופרד כדי לאפשר הרצת שלב נוסף, בטלנו בסוף
function LevelUp() {
    level++;

    //האינדקס שהוגרל
    const rand = GetRandomIndex();
    console.log(rand);

    //הוספת איבר למערך האורות המוגרלים ♥
    arrLight.push(rand);
    console.log(arrLight);
}


//הגרלת מספר ♥
function GetRandomIndex() {
    return Math.floor(Math.random() * 4);
}


//הרצת תור מחשב
function Game() {

    console.log("computer's turn");

    //הזרקת השלב הנוכחי לכרטיס המידע
    document.querySelector("#levelInfo").innerHTML = `${getStr("level")} <br> ${level} / 10`;

    //איפוס שעון הזמן
    document.getElementById('countdownNumber').innerHTML = "";
    document.querySelector("#circle").classList.remove("animated");

    //הוספת קלאס 'תור מחשב' לבאדי
    document.querySelector("body").classList.add("computerTurn");

    //הדלקת הלחצנים שהוגרלו - עם השהיה בהתאם למהירות המוגדרת
    indexComputer = 0;
    intervalComputer = setInterval(() => {
        On(arrLight[indexComputer++])
        if (indexComputer == level) {
            clearInterval(intervalComputer);
            //בסיום הרצת המחשב מעבר לתור שחקן
            Player();
        }
    }, speed);
};



//הדלקת אור כפתור
function On(index) {

    //לכידת הלחצן
    let buttonDiv = document.querySelector(`#${buttons[index].idButton}`);
    //הוספת קלאס דלוק
    buttonDiv.classList.add("on");
    //הסרת הקלאס אחרי שניה
    setTimeout(function () {
        buttonDiv.classList.remove("on");
    }, 150);

}




//------------ player's turn ------------

function Player() {

    console.log("player turn");

    //הסרת קלאס 'תור מחשב' מהבאדי
    document.querySelector("body").classList.remove("computerTurn");

    //איפוס מונה לחיצות
    indexPlayer = 0;

    //הפעלת ספירה לאחור
    countIntervalPlayer = 10;
    document.querySelector("#circle").classList.add("animated");

    intervalPlayer = setInterval(() => {
        //הזרקת הספירה לעיגול הפנימי
        document.getElementById('countdownNumber').innerHTML = --countIntervalPlayer;

        //אם שחקן סיים שלב
        if (indexPlayer == level) {

            //עצירת הטיימר
            clearInterval(intervalPlayer);

            //אם סיים שלב 10
            if (level == 10) {
                //העלאת שלב - לשמירת שיא נכון
                LevelUp();
                //פופאפ הצלחה
                const divSuccess = document.querySelector("#popupSuccess");
                Popup(divSuccess);
            }

            //העלאת שלב והרצת משחק
            LevelUp();
            Game();
        }

        //אם נגמר הזמן
        else if (countIntervalPlayer == 0) {
            clearInterval(intervalPlayer);
            const divTimeOver = document.querySelector("#popupTimeOver");
            Popup(divTimeOver);
        }

    }, 1000);

}



//בעת לחיצת שחקן
function OnPlayerClick() {

    //לכידת האלמנט עליו לחץ
    const idName = this.getAttribute("id");

    //מציאת אינדקס האלמנט ♥
    indexClicked = buttons.findIndex(function (value) {
        return value.idButton == idName;
    });

    //מעבר להמשך תור שחקן
    PlayerTurn();

};

//בעת לחיצה על המקלדת ♥
function OnPlayerKey(e) {

    //מציאת אינדקס הלחצן ומעבר להמשך תור שחקן
    console.log(e.key);
    switch (e.key) {
        case 'ArrowLeft':
            indexClicked = 3;
            PlayerTurn();
            break;
        case 'ArrowRight':
            indexClicked = 1;
            PlayerTurn();
            break;
        case 'ArrowUp':
            indexClicked = 0;
            PlayerTurn();
            break;
        case 'ArrowDown':
            indexClicked = 2;
            PlayerTurn();
            break;

        default:
            document.focus();
            break;
    }
}


//המשך תור שחקן
function PlayerTurn() {

    //שליחה להדלקה
    On(indexClicked);

    //בדיקה האם הלחצן נכון
    const isGood = arrLight[indexPlayer] == indexClicked;
    if (isGood) {
        console.log("good");
        indexPlayer++;
    }
    //אם לא נכון
    else {
        clearInterval(intervalPlayer);
        console.log("fail");
        const divFailure = document.querySelector("#popupFailure");
        Popup(divFailure);
    }
}



//עדכון פרטי שיאים
function UpdateScore() {


    // קריאת הנתונים מ-localStorage
    let highScoresJSON = localStorage.getItem('arrScoresJSON');

    // אם יש נתונים ב-localStorage
    if (highScoresJSON) {
        // המרת המחרוזת למערך של השיאים
        arrScores = JSON.parse(highScoresJSON);
    };

    //הוספה למערך השיאים את השלב אליו הגיע השחקן -פחות השלב האחרון שלא הצליח
    arrScores.push({ "name": playerName, "score": level - 1 });

    // מיון השיאים
    arrScores.sort(function (a, b) { return a.score - b.score; });

    //מחיקת שיאים כפולים
    for (let i = 0; i < arrScores.length - 1; i++) {
        if (arrScores[i].name == arrScores[i + 1].name && arrScores[i].score == arrScores[i + 1].score)
            arrScores.slice(i + 1);
    };

    //העדפת משתמש נוכחי
    let p = arrScores.length - 1;
    while (arrScores[p].score == arrScores[p - 1].score && arrScores[p].name != playerName) {
        if (arrScores[p-1].name == playerName) {
            let temp = arrScores[arrScores.length - 1];
            arrScores[arrScores.length - 1] == arrScores[p-1];
            arrScores[p-1] = temp;
        }
        p--;
    }

    console.log("arrScores sorted");
    console.log(arrScores);

    //הזרקת שיא מקסימלי - בלי למחוק אותו
    document.querySelector("#maxScore").innerHTML = `${getStr("maxScore")} <br> ${getStr("level")} ${arrScores[arrScores.length - 1].score}- ${arrScores[arrScores.length - 1].name}`;

    //הזרקת כותרת שיא קודם - אם ישנו
    if (arrScores.length > 1) {
        document.querySelector("#preScores").innerHTML = `${getStr("preScores")}`;
    }

    //מחיקת שיא קודם
    const playerScoreElements = document.querySelector("#playerScore").children;
    for (element of playerScoreElements) {
        if (element.getAttribute("data-id") == "preScores")
            element.remove();
    }

    let newP = document.createElement('p');
    newP.setAttribute("data-id", "preScores");
    newP.innerHTML = `${getStr("level")} ${arrScores[arrScores.length - 2].score} - ${arrScores[arrScores.length - 2].name}`;
    document.querySelector("#playerScore").append(newP);

    //המרת מערך השיאים לג'יסון
    let arrScoresJSON = JSON.stringify(arrScores);

    // שמירת הנתונים באמצעות localStorage
    localStorage.setItem('arrScoresJSON', arrScoresJSON);

}





// ------------------- popups ------------------

//הקפצת פופאפ מתאים
function Popup(div) {

    //מילוי הפופאפ בתוכן
    PopupContent(div);

    //נעילת הפוקוס בתוך הפופאפ
    KeepTabNavInPopup(div);

    //הוספת קלאס תצוגה
    div.classList.add("displayFlex");

    /*
        //אם העכבר לא על הפופאפ - הפעלת טיימר להסרת תצוגה ♥
        div.onmouseleave = () => {
            countIntervalPopup = 6;
            intervalPopup = setInterval(() => {
                countIntervalPopup--;
                if (countIntervalPopup == 0) {
                    clearInterval(intervalPopup);
                    div.classList.remove("displayFlex");
                }
            }, 1000)
        };
    */

    //עדכון פרטי השיאים
    UpdateScore();
}


//מילוי תוכן מתאים
function PopupContent(div) {

    //מציאת האלמנטים בתוך הדיב ♥
    const divsChildren = div.children;

    //הזרקת התוכן ♥
    for (element of divsChildren) {
        const dataAct = element.getAttribute("data-act");
        element.innerHTML = getStr(`${dataAct}`);
    }

}


//לחיצה על כפתור בפופאפ
function OnPopupButton() {

    //הסרת הפופאפ ♥
    this.closest(".popup").classList.remove("displayFlex");

    //לכידת סוג הכפתור
    const dataAct = this.getAttribute("data-act");

    switch (dataAct) {
        //משחק חוזר
        case "again":
            level = 0;
            arrLight = [];
            LevelUp();
            Game();
            break;
        //יציאה
        case "exit":
            window.location.href = "../home.html";
            break;
        //לשלב מהיר יותר
        case "extra":
            speed -= 100;
            level = 0;
            arrLight = [];
            LevelUp();
            Game();
            break;
    }
}


//נעילת הפוקוס בתוך הפופאפ
function KeepTabNavInPopup(div) {

    //מזהה הפופאפ
    const idName = div.getAttribute("id");
    //הכפתורים שבו
    const divsButtons = document.querySelectorAll(`#${idName} button`);
    //התפקסות על כפתור ראשון
    divsButtons[0].focus();
    //אם הגיע ללחצן האחרון- חוזר לראשון
    divsButtons[divsButtons.length - 1].onkeydown = function (e) {
        if ((e.which === 9 && !e.shiftKey)) {
            e.preventDefault();
            divsButtons[0].focus();
        }
    };
    //אם הגיע לראשון ורוצה לחזור אחורה
    divsButtons[0].addEventListener('keydown', function (e) {
        if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            divsButtons[divsButtons.length - 1].focus();
        }
    });
}