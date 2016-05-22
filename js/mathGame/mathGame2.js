var equationTable = document.getElementById("answer-table"); //table that contains equation
var equationRow = document.getElementById("answer-row"); // Div that displays the equation
var currentNumber; // Current number to find
var operandCount = 0; // Current amount of operands found
var equationLength = 4; // Length of the full equation (1 + 1 [= 2])
var currentIndex = 0; //Current index to highlight/find in equation

var answer; // The answer to find
var operator; // Current operator in use
var operand1; // The first operand
var operand2; // The second operand

/**
 * Draw a random word at the top to collect.
 */
function drawEquation() {
  for (var i = 0; i < equationLength; i++) {
    equationRow.insertCell(0);
  }
  
  for (var i = 0; i < 3; i++) {
    equationRow.cells[i].innerHTML = "&nbsp;";
    equationRow.cells[i].className = "equation-answer";
  }
  
  // Assign the operands and operator to their cell
  operand1 = equationRow.cells[0];
  operator = equationRow.cells[1];
  operand2 = equationRow.cells[2];
  
  operand1.style = "border: 5px solid white";
  
  equationTable.style = "margin-top: 10px; border-spacing: 20px; color: #FFFFFF;";
  
  // Generates a random number from -9 to 18
  answer = Math.floor(Math.random() * 28) - 9;
  equationRow.cells[3].innerHTML = "&nbsp;=&nbsp;" + answer;
}

/**
 * Collects the operand or operator and displays it at the top.
 * When the equation is complete, it calls checkAnswer() to check
 * if the equation is true or not.
 */
function equationCollision(character) {
  //checks first operand
  if (currentIndex == 0) {
  
    if (!isNaN(character)) {
      correctElementSound.play();
      operand1.innerHTML = character;
      
      currentIndex++;
      operand1.style = ""; //clears current border
      operator.style = "border: 5px solid white"; //updates next border
      
    } else if (isNaN(character)) {
      wrongElementSound.play();
      clearEquation();
      drawEquation();
    }
  
  //checks operator
  } else if (currentIndex == 1) {
  
    if (isNaN(character)) {
      correctElementSound.play();
      operator.innerHTML = character;
      
      currentIndex++;
      operator.style = ""; //clears current border
      operand2.style = "border: 5px solid white"; //updates next border
      
    } else if (!isNaN(character)) {
      wrongElementSound.play();
      clearEquation();
      drawEquation();
      currentIndex = 0;
    }
  
  //checks second operand
  } else if (currentIndex == 2) {
  
    if (!isNaN(character)) {
      correctElementSound.play();
      operand2.innerHTML = character;
      currentIndex = 0;
      
    } else if (isNaN(character)) {
      wrongElementSound.play();
      clearEquation();
      drawEquation();
      currentIndex = 0;
    }
  }
  
  // Checks if the answer is correct when equation is collected
  if (operator.innerHTML != "&nbsp;" && operand1.innerHTML != "&nbsp;" &&
      operand2.innerHTML != "&nbsp;") {
    checkAnswer();
  }
}

/**
 * Checks what operator is in use and checks to see if the equation is correct.
 * If the answer is correct, it updates the score. If the answer is wrong, it
 * takes away a life. It then clears the equation and draws a new one.
 */
function checkAnswer() {
  if (operator.innerHTML == "+") { // Addition
    if (parseInt(operand1.innerHTML) + parseInt(operand2.innerHTML) == answer) {
      correctAnswerSound.play();
      currentScore += 500 * scoreMult;
      document.getElementById("score-counter").innerHTML = "" + currentScore;
    } else { // Wrong answer
      currentLives--;
      updateLives();

      if (currentLives != 0) {
        wrongElementSound.play();
      } else { // Lost the game
        gameOver();
      }
    }
  } else { // Subtraction
    if (parseInt(operand1.innerHTML) - parseInt(operand2.innerHTML) == answer) {
      correctAnswerSound.play();
      currentScore += 500 * scoreMult;
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      clearEquation();
      drawEquation();
    } else { // Wrong answer
      currentLives--;
      updateLives();

      if (currentLives != 0) {
        wrongElementSound.play();
      } else { // Lost the game
        gameOver();
      }
    }
  }
  clearEquation();
  drawEquation();
}

/**
 * Clears cells in answer row.
 */
function clearEquation() {
  equationRow.innerHTML = "";
}

window.onload = drawEquation();