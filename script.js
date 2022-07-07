"use strict";

// Module that generates an object with the gameboard. Each square has an assigned index number.
const gameBoardMap = (() => {
  const assignedSquares = {};
  for (let i = 0; i < 9; i++) {
    assignedSquares[i.toString()] = i;
  }
  return { assignedSquares };
})();

// Factory function that generates a Player object with name, symbol (X or O) and methods.
const Player = (playerName, playerSymbol) => {
  function addMoveToBoard(position) {
    gameBoardMap.assignedSquares[position.toString()] = playerSymbol;
  }

  return { playerName, playerSymbol, addMoveToBoard };
};

// Module that returns an array with players and a function that creates two players based on form input value and pushes them into previously mentioned array.

const startGameModule = (() => {
  let players = [];
  let activePlayer = [];
  function startGame(event) {
    event.preventDefault();
    const errorMsg = document.querySelector(".error");
    const inputPlayerX = document.getElementById("playerX").value;
    const inputPlayerO = document.getElementById("playerO").value;
    let playerX;
    let playerO;
    const boardContainer = document.querySelector(".boardContainer");
    const gameMenu = document.querySelector(".gameMenu");
    if (inputPlayerO && inputPlayerX) {
      playerX = Player(`${inputPlayerX}`, "X");
      playerO = Player(`${inputPlayerO}`, "O");
      players.push(playerX);
      players.push(playerO);
      activePlayer.push(players[0]);
      gameMenu.style.display = "none";
      boardContainer.style.display = "block";
      console.log(playerX, playerO);
    } else {
      errorMsg.textContent = "Fill in both names";
    }
  }

  return { startGame, players, activePlayer };
})();

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", startGameModule.startGame);

// Module that returns the playerMove function
const gameBoardController = (() => {
  let totalMoves = 0;
  let playerXMoves = 0;
  let playerOMoves = 0;

  // Checks to see if three symbols are the same, and if yes, check to see if player X has more moves. If he does, he wins.
  function _symbolChecker(p1, p2, p3) {
    if (p1 === p2 && p1 === p3) {
      playerXMoves > playerOMoves
        ? console.log("Player X won")
        : console.log("Player O won");

      console.log(document.getElementById(`${p1}`));
    }
  }

  // Checks to see if the three symbols that are the same are also in a row
  function _checkForThreeInARow() {
    console.log("I have been triggered");
    _symbolChecker(
      `${gameBoardMap.assignedSquares[0]}`,
      `${gameBoardMap.assignedSquares[1]}`,
      `${gameBoardMap.assignedSquares[2]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[3]}`,
      `${gameBoardMap.assignedSquares[4]}`,
      `${gameBoardMap.assignedSquares[5]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[6]}`,
      `${gameBoardMap.assignedSquares[7]}`,
      `${gameBoardMap.assignedSquares[8]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[0]}`,
      `${gameBoardMap.assignedSquares[3]}`,
      `${gameBoardMap.assignedSquares[6]}`
    );

    _symbolChecker(
      `${gameBoardMap.assignedSquares[1]}`,
      `${gameBoardMap.assignedSquares[4]}`,
      `${gameBoardMap.assignedSquares[7]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[2]}`,
      `${gameBoardMap.assignedSquares[5]}`,
      `${gameBoardMap.assignedSquares[8]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[0]}`,
      `${gameBoardMap.assignedSquares[4]}`,
      `${gameBoardMap.assignedSquares[8]}`
    );
    _symbolChecker(
      `${gameBoardMap.assignedSquares[6]}`,
      `${gameBoardMap.assignedSquares[4]}`,
      `${gameBoardMap.assignedSquares[2]}`
    );
  }

  // Displays X/O on gameboard depending on current active player, and then updates the active player.
  function playerMove(event) {
    // Checks for winner/draw after certain number of moves.
    function _checkForWinner() {
      totalMoves++;
      console.log(`Total moves: ${totalMoves}`);
      if (totalMoves >= 5) {
        _checkForThreeInARow();
      }
      if (totalMoves >= 8) {
        console.log("Its a draw");
      }
    }

    if (startGameModule.activePlayer[0] === startGameModule.players[0]) {
      if (event.target.textContent) {
        return;
      }

      startGameModule.players[0].addMoveToBoard(`${event.target.id}`);
      playerXMoves++;
      console.log(`Player X moves: ${playerXMoves}`);
      _checkForWinner();

      event.target.textContent = startGameModule.players[0].playerSymbol;
      startGameModule.activePlayer[0] = startGameModule.players[1];
    } else if (startGameModule.activePlayer[0] === startGameModule.players[1]) {
      if (event.target.textContent) {
        return;
      }
      startGameModule.players[1].addMoveToBoard(`${event.target.id}`);
      playerOMoves++;
      console.log(`Player O moves: ${playerOMoves}`);
      _checkForWinner();
      event.target.textContent = startGameModule.players[1].playerSymbol;
      startGameModule.activePlayer[0] = startGameModule.players[0];
    }
  }
  return { playerMove };
})();

const squares = document.querySelectorAll(".boardGrid__square");

squares.forEach((square) => {
  square.addEventListener("click", gameBoardController.playerMove);
});
