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
  let playerXScore = document.querySelector(".player1Score");
  let playerOScore = document.querySelector(".player2Score");
  let players = [];
  let activePlayer = [];
  let playerIndicator = document.querySelector(".playerIndicator");

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
      boardContainer.style.display = "flex";
      document.querySelector(
        ".player1Name"
      ).textContent = `${startGameModule.players[0].playerName}`;
      document.querySelector(
        ".player2Name"
      ).textContent = `${startGameModule.players[1].playerName}`;

      playerXScore.textContent = "0";
      playerOScore.textContent = "0";
      playerIndicator.textContent = `${startGameModule.players[0].playerName}'s turn.`;
    } else {
      errorMsg.textContent = "Fill in both names";
    }
  }

  return {
    startGame,
    players,
    activePlayer,
    playerXScore,
    playerOScore,
    playerIndicator,
  };
})();

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", startGameModule.startGame);

// Module that returns the playerMove function and uses other private variables and functions.
const gameBoardController = (() => {
  let totalMoves = 0;
  let playerXMoves = 0;
  let playerOMoves = 0;
  let scoreX = 0;
  let scoreO = 0;
  let winner = "";

  // Checks to see if three symbols are the same, and if yes, check to see if player X has more moves. If he does, he wins.
  function _symbolChecker(p1, p2, p3) {
    if (p1 === p2 && p1 === p3) {
      document.querySelector(".boardGrid").style.pointerEvents = "none";
      document.querySelector(".endGame").style.display = "block";
      document.getElementById("newGame").textContent = "New game?";

      if (playerXMoves > playerOMoves) {
        document.querySelector(
          ".message"
        ).textContent = `${startGameModule.players[0].playerName} won.`;
        scoreX++;
        startGameModule.playerXScore.textContent = scoreX;
        winner = startGameModule.players[0].playerName;
      } else {
        document.querySelector(
          ".message"
        ).textContent = `${startGameModule.players[1].playerName} won.`;
        scoreO++;
        startGameModule.playerOScore.textContent = scoreO;
        winner = startGameModule.players[1].playerName;
      }

      // Reset some variables in order to start new game but keep score
      newGame.addEventListener("click", () => {
        document.querySelector(".boardGrid").style.pointerEvents = "auto";
        document.querySelector(".endGame").style.display = "none";
        for (let i = 0; i < 9; i++) {
          gameBoardMap.assignedSquares[i.toString()] = i;
        }
        startGameModule.activePlayer[0] = startGameModule.players[0];
        totalMoves = 0;
        playerXMoves = 0;
        playerOMoves = 0;
        winner = "";
        startGameModule.playerIndicator.textContent = `${startGameModule.players[0].playerName}'s turn.`;

        squares.forEach((square) => {
          square.textContent = "";
          square.style.fontSize = "6rem";
        });
      });

      return true;
    }
  }

  // Checks for each possible winning combo. If winner combo is found, symbols get special color.
  function _checkForThreeInARow() {
    if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[0]}`,
        `${gameBoardMap.assignedSquares[1]}`,
        `${gameBoardMap.assignedSquares[2]}`
      )
    ) {
      document.getElementById("0").style.fontSize = "12rem";
      document.getElementById("1").style.fontSize = "12rem";
      document.getElementById("2").style.fontSize = "12rem";
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[3]}`,
        `${gameBoardMap.assignedSquares[4]}`,
        `${gameBoardMap.assignedSquares[5]}`
      )
    ) {
      {
        document.getElementById("3").style.fontSize = "12rem";
        document.getElementById("4").style.fontSize = "12rem";
        document.getElementById("5").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[6]}`,
        `${gameBoardMap.assignedSquares[7]}`,
        `${gameBoardMap.assignedSquares[8]}`
      )
    ) {
      {
        document.getElementById("6").style.fontSize = "12rem";
        document.getElementById("7").style.fontSize = "12rem";
        document.getElementById("8").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[0]}`,
        `${gameBoardMap.assignedSquares[3]}`,
        `${gameBoardMap.assignedSquares[6]}`
      )
    ) {
      {
        document.getElementById("0").style.fontSize = "12rem";
        document.getElementById("3").style.fontSize = "12rem";
        document.getElementById("6").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[1]}`,
        `${gameBoardMap.assignedSquares[4]}`,
        `${gameBoardMap.assignedSquares[7]}`
      )
    ) {
      {
        document.getElementById("1").style.fontSize = "12rem";
        document.getElementById("4").style.fontSize = "12rem";
        document.getElementById("7").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[2]}`,
        `${gameBoardMap.assignedSquares[5]}`,
        `${gameBoardMap.assignedSquares[8]}`
      )
    ) {
      {
        document.getElementById("2").style.fontSize = "12rem";
        document.getElementById("5").style.fontSize = "12rem";
        document.getElementById("8").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[0]}`,
        `${gameBoardMap.assignedSquares[4]}`,
        `${gameBoardMap.assignedSquares[8]}`
      )
    ) {
      {
        document.getElementById("0").style.fontSize = "12rem";
        document.getElementById("4").style.fontSize = "12rem";
        document.getElementById("8").style.fontSize = "12rem";
      }
    } else if (
      _symbolChecker(
        `${gameBoardMap.assignedSquares[6]}`,
        `${gameBoardMap.assignedSquares[4]}`,
        `${gameBoardMap.assignedSquares[2]}`
      )
    ) {
      {
        document.getElementById("6").style.fontSize = "12rem";
        document.getElementById("4").style.fontSize = "12rem";
        document.getElementById("2").style.fontSize = "12rem";
      }
    } else return;
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
      if (totalMoves === 9 && winner === "") {
        document.querySelector(".boardGrid").style.pointerEvents = "none";
        document.querySelector(".endGame").style.display = "block";
        document.getElementById("newGame").textContent = "New game?";
        document.querySelector(".message").textContent = `It's a draw`;
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
      !winner
        ? (startGameModule.playerIndicator.textContent = `${startGameModule.players[1].playerName}'s turn.`)
        : (startGameModule.playerIndicator.textContent = "");
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
      !winner
        ? (startGameModule.playerIndicator.textContent = `${startGameModule.players[0].playerName}'s turn.`)
        : (startGameModule.playerIndicator.textContent = "");

      startGameModule.activePlayer[0] = startGameModule.players[0];
    }
  }
  return { playerMove };
})();

const squares = document.querySelectorAll(".boardGrid__square");

squares.forEach((square) => {
  square.addEventListener("click", gameBoardController.playerMove);
});
