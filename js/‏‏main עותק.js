var tamerId = document.getElementById("tamer");
const box = document.getElementById("dtaSpin");
const spinDiv = document.getElementById("DivTurnsAround");
const score = document.getElementById("score");
const missedClick = document.getElementById("missed");
const htLevel = document.getElementById("level");
const ht_nextLevel = document.getElementById("nextl_level");
var playersName = document.getElementById("highScores");
var hoverDiv = document.getElementsByClassName("hoverDiv");

var tamer = 60; // טיימר
var sum = null; // vvdsrv ak JSON
var removClick = true; //מגביל את הקליק לאחר המשחק
var speedTime = 300; // הגדרה של שניות של תזוזה של הדיב
var nextL = false; // var  של רמה נוספת
var count = 0; //הגדרה של התוספת נקודות
var misse = 0; // הגדרה של קליקים מזוייפים
var countLevel = 0;
var nextLevel = 10; // כמות ההסופה של הניקוד
var level = 1;
var yourName = "";
var animationStyle = 2.0; //
var nameEx = false; // תנאי של פונקציה שחקנים
var players = []; // arr של שחקנים
var objPlayers = {}; // אובייקט של JSON
var stopGame = false; // גורם לעצירה של המשחק לאחר הסיום
var datetime = "";

playersDisplay();
function gameOver() {
  // Checks if the name is inside the lion.
  // If he is there then update.
  // If not then add

  
  for (i = 0; i < players.length; i++) {
    if (players[i].name == yourName) {
      nameEx = true;
      // change only his score
      players[i].score = count;
      break;
    }
  }
  // add a new player
  if (players.length < 5 && nameEx == false) {
    players.push({ name: yourName, score: count, date: datetime });
  } else if (
    // if we have alredey 5 players but the new player has more score then one of the players.
    count > players[players.length - 1].score &&
    nameEx == false
  ) {
    players[players.length - 1].name = yourName;
    players[players.length - 1].score = count;
    players[players.length - 1].date = datetime;
  }
  // sort the scores
  players.sort(function (a, b) {
    return b.score - a.score;
  });
  //updatePlayer();
  // clean the table score
  playersName.innerHTML = "";
  // update the table score end the date end tame
  players.forEach(function (play) {
    playersName.innerHTML +=
      ` <br> <div id="date">` +
      play.score +
      ` - ` +
      play.name +
      `<span class="hoverDiv">` +
      play.date +
      `</span> </div>`;
    upPlayersNames();
  });
}
function upPlayersNames() {
  var nameJSON = JSON.stringify(players);
  localStorage.setItem("allNames", nameJSON);
}
// update the JAON local storage
function playersDisplay() {
  var nameJSON = localStorage.getItem("allNames");
  if (nameJSON != null) {
    var arr = JSON.parse(nameJSON);
    if (arr.length > 0) {
      players = arr;
    }
    players.forEach(function (play) {
      playersName.innerHTML +=
        ` <br> <div id="date">` +
        play.score +
        ` - ` +
        play.name +
        `<span class="hoverDiv">` +
        play.date +
        `</span> </div>`;
    });
  }
}
console.log(datetime);
// start the Game
function dStart() {
  yourName = prompt(" What's your Name ? ");
  con = confirm("Ready to start?");
  if (con == true && stopGame == false) {
    spinDiv.style.animation = "spin 2s linear infinite";
    catch_click();
    datetime = timeDate =
      new Date()
        .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
        .replace(/\D/g, "/") +
      " " +
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      });
  }
}
function catch_click() {
  if (con == true) {
    sum = setInterval(function () {
      tamer--;
      tamerId.innerHTML = tamer;
      spinDiv.addEventListener("click", clickMe);
      if (tamer == 0 || level > 5) {
        clearInterval(sum);
        removClick = false;
        gameOver();
        tamer = 60;
        con = false;
        stopGame = true;
        tamerId.innerHTML = tamer;
        spinDiv.removeEventListener("mouseover", moveClick);
        spinDiv.style.animation = "none";
        spinDiv.removeEventListener("click", clickMe);
        if (tamer == 0 || level != 5) {
          alert(` Game over: ` + ` ` + yourName + ` \n  ` + `Try again!!!`);
        }
      }
    }, 1000); //TIMER
    spinDiv.addEventListener("mouseover", moveClick);
  }
}

var clickWork = false; // האם לחצתי על ckick ?

function clickMe() {
  if (con == true && removClick == true) {
    clickWork = true;
    count += level * 10;
    nextLevel--;
    ht_nextLevel.innerHTML = nextLevel;
    score.innerHTML = count;
    countLevel++;
  }
  if (countLevel % 10 == 0) {
    nextLevel = 10;
    ht_nextLevel.innerHTML = nextLevel;
    level++;
    tamer += 10;
    tamerId.innerHTML = tamer;
    htLevel.innerHTML = level;
    speedTime -= 50;
    animationStyle -= 0.25;
    spinDiv.style.animation = "spin " + animationStyle + "s linear infinite";
  }
}
function dtaSpin() {
  if (clickWork == false && removClick == true && count > 0) {
    count -= level;
    score.innerHTML = count;
    misse++;
    missedClick.innerHTML = misse;
  }
  clickWork = false;
}
function moveClick() {
  setTimeout(function () {
    let boxH = Math.floor(Math.random() * 440); // הוא מכפיל את המספר הרנדומלי שלו בהתאם לגובה/רוחב של הקופסה
    let boxW = Math.floor(Math.random() * 770);
    spinDiv.style.left = boxW + "px"; // הוא מזיז ד
    // את הדיב בתאם רוחב הפיקסלים של הקופסה השחורה
    spinDiv.style.top = boxH + "px"; // כנ"ל רק לגובה
  }, speedTime);
}

//------------------------------
