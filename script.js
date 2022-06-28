"use strict";

// Module that generates an object with the gameboard. Each square has an assigned index number.
const gameBoard = (() => {
  const assignedSquares = {};
  for (let i = 0; i < 9; i++) {
    assignedSquares[i.toString()] = i;
  }
  return { assignedSquares };
})();

// Factory function that generates a Player object with name, symbol (X or O) and methods.
const Player = (playerName, playerSymbol) => {
  function addMoveToBoard(position) {
    gameBoard.assignedSquares[position.toString()] = playerSymbol;
  }

  return { playerName, playerSymbol, addMoveToBoard };
};

const startGameModule = (() => {
  let players = [];
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

      gameMenu.style.display = "none";
      boardContainer.style.display = "block";
      console.log(playerX, playerO);
    } else {
      errorMsg.textContent = "Fill in both names;";
    }
  }

  return { startGame, players };
})();

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", startGameModule.startGame);
