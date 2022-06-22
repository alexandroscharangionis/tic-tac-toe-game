"use strict";

// Module that generates an object with the gameboard. Each square has an assigned index number.
const gameBoard = (() => {
  const assignedSquares = {};
  for (let i = 0; i < 9; i++) {
    assignedSquares[i.toString()] = i;
  }
  return { assignedSquares };
})();

// Factory function that generates a Player object with name, index, symbol (X or O) and methods.
const Player = (playerName, playerIndex, playerSymbol) => {
  function addMoveToBoard(position) {
    gameBoard.assignedSquares[position] = playerSymbol;
  }

  return { playerName, playerIndex, playerSymbol, addMoveToBoard };
};

const aki = Player("Aki", 1, "X");
const filip = Player("Filip", 2, "O");
