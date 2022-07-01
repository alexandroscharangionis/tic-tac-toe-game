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

// Module that returns an array with players and function that creates two players based on form input value and pushes them into previously mentioned array.

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
      errorMsg.textContent = "Fill in both names;";
    }
  }

  return { startGame, players, activePlayer };
})();

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", startGameModule.startGame);

// Module that returns a function that displays X/O on gameboard depending on current active player, and then updates the active player
const gameBoardController = (() => {
  function playerMove(event) {
    if (startGameModule.activePlayer[0] === startGameModule.players[0]) {
      startGameModule.players[0].addMoveToBoard(`${event.target.id}`);
      event.target.textContent = startGameModule.players[0].playerSymbol;
      startGameModule.activePlayer[0] = startGameModule.players[1];
      // console.log(gameBoardMap.assignedSquares, startGameModule.activePlayer);
    } else if (startGameModule.activePlayer[0] === startGameModule.players[1]) {
      startGameModule.players[1].addMoveToBoard(`${event.target.id}`);
      event.target.textContent = startGameModule.players[1].playerSymbol;
      startGameModule.activePlayer[0] = startGameModule.players[0];
      // console.log(gameBoardMap.assignedSquares, startGameModule.activePlayer);
    }
  }
  return { playerMove };
})();

const squares = document.querySelectorAll(".boardGrid__square");

squares.forEach((square) => {
  square.addEventListener("click", gameBoardController.playerMove);
});
