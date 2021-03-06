/**
 * Global variables for gamemode.
 */
var gamemode = "spelling"; // Current gamemode being played (default spelling)
var gameActive = false; // Where the game is currently being played

/**
 * Global variables for spelling gamemode.
 * Made global to spawn letters more frequently that are in the current word.
 */
var wordList = []; // Array of words to find
var currentWord; // Current word to find
var wordLength; // Length of the word

/**
 * Global variables for difficulty.
 */
var difficulty = 2; // Difficulty level being played (default medium)

/**
 * Global variables for lives.
 */
var currentLives = 5; // Current lives in game

/**
 * Global variables for score.
 */
var currentScore = 0; // Current score in game
var scoreMult = 0.75; // Score multiplier (default medium)

/**
 * Global variables for pause.
 */
var paused = false; // Game is paused or not
var canPause = false; // Whether player can pause or not

/**
 * Global variables for falling elements
 */
var elements = []; // Array for falling elements
var elementSpeed; // Speed of elements (default medium)
var elementAmount; // Amount of elements to continuously spawn (default medium)
// Sets speed and amount of elements depending on screen size
if (window.innerWidth >= 550) {
  elementSpeed = 7;
  elementAmount = 13;
} else {
  elementSpeed = 5;
  elementAmount = 10;
}
var elementWidth = 70; // Width of the elements
var elementHeight = 70; // Height of the elements

/**
 * Global variables for special elements.
 */
var specialItems = []; // Array for special elements
var specialElement; // The special element to fall
var specialAmount = 2; // Amount of special elements to spawn
var specialSpeed = 8; // Speed of the special elements
var specialWidth = 40; // Width of the special elements
var specialHeight = 40; // Height of the special elements
var specialSpawned = false; // Whether a special items is spawned or not
var specialSpawnTimer; // Spawn timer for special elements

/**
 * Global variables for bonus elements and bonus level.
 */
var bonusItems = []; // Array for bonus elements
var bonusAmount; // Amount of items to spawn on bonus level
// Sets amount of bonus items to fall depending on screen size
if (window.innerWidth >= 550) {
  bonusAmount = 30;
} else {
  bonusAmount = 20;
}
var bonusSpeed = 5; // Speed of the bonus elements
var bonusActive = false; // Bonus level active or not
var bonusLength = 10000; // Bonus level active in ms
var bonusWidth = 70; // Width of the bonus elements
var bonusHeight = 70; // Height of the bonus elements
var bonusTimer; // Timer for bonus level

/**
 * Global variables for achievements.
 */
var eggCount = 0;

/** The keycodes that will be mapped when a user presses a button.
 * Original code by Doug McInnes.
 */
KEY_CODES = {
  37: "left",
  39: "right",
  27: "escape",
};

/** Creates the array to hold the KEY_CODES and sets all their values
 * to false. Checking true/flase is the quickest way to check status
 * of a key press and which one was pressed when determining
 * when to move and which direction.
 */
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}

/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function (e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
    
    if (KEY_STATUS.escape) { // escape
      if (paused) {
        resume();
      } else {
        pause();
      }
    }
  }
};

/**
 * Sets up the document to listen to onkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets the appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
};

/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function ( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();