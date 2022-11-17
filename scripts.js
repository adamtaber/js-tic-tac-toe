
const GameBoard = (() => {
  let board = [['', '', ''], ['', '', ''], ['', '', '']];

  let domBoard = document.getElementById('board')

  let listener = function (e) {
    Player().placePiece(e);
  }

  const printBoard = () => {
    domBoard.querySelector('#NW').innerText = board[0][0];
    domBoard.querySelector('#N').innerText = board[0][1];
    domBoard.querySelector('#NE').innerText = board[0][2];
    domBoard.querySelector('#W').innerText = board[1][0];
    domBoard.querySelector('#C').innerText = board[1][1];
    domBoard.querySelector('#E').innerText = board[1][2];
    domBoard.querySelector('#SW').innerText = board[2][0];
    domBoard.querySelector('#S').innerText = board[2][1];
    domBoard.querySelector('#SE').innerText = board[2][2];
  }

  const createButtons = () => {
    let boardSquares = Array.from(document.getElementsByClassName("board-square"));

    boardSquares.forEach(function(square) {
      square.addEventListener('click', listener)
    })
    // boardSquares.forEach(function(square) {
    //   square.addEventListener('click', e => {
    //     Player().placePiece(e);
    //   })
    // })
  }

  const removeButtons = () => {
    let boardSquares = Array.from(document.getElementsByClassName("board-square"));

    boardSquares.forEach(function(square) {
      square.removeEventListener('click', listener)
    })
  }

  return {board, printBoard, createButtons, removeButtons};
})();

const Player = () => {
  const setBoard = () => {
    GameBoard.board[0][0] = document.getElementById('NW').innerText;
    GameBoard.board[0][1] = document.getElementById('N').innerText;
    GameBoard.board[0][2] = document.getElementById('NE').innerText;
    GameBoard.board[1][0] = document.getElementById('W').innerText;
    GameBoard.board[1][1] = document.getElementById('C').innerText;
    GameBoard.board[1][2] = document.getElementById('E').innerText;
    GameBoard.board[2][0] = document.getElementById('SW').innerText;
    GameBoard.board[2][1] = document.getElementById('S').innerText;
    GameBoard.board[2][2] = document.getElementById('SE').innerText;
  }

  const placePiece = (e) => {
    document.getElementById('gameMessage').innerText = "";

    let selectedPiece = e.target.id;

    if(document.getElementById(selectedPiece).innerText === '') {
      if(Game.turnCount % 2 === 0) {
        document.getElementById(selectedPiece).innerText = 'X';
        GameBoard.board[0][0] = 'X';
      }else if(Game.turnCount % 2 === 1) {
        document.getElementById(selectedPiece).innerText = 'O';
      }
      setBoard();
      Game.checkWinner();
      Game.turnCount += 1;
    }else {
      document.getElementById('gameMessage').innerText = "Please choose an empty square";
    }
  }

  return {placePiece};
}

const Game = (() => {
  let turnCount = 0;

  const resetBoard = () => {
    GameBoard.board = [['', '', ''], ['', '', ''], ['', '', '']];
  }

  const checkWinner = () => {
    function isX(symbol) {
      return symbol === 'X';
    }

    function isO(symbol) {
      return symbol === 'O';
    }

    function transpose(matrix) {
      return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    let transposedBoard = transpose(GameBoard.board)

    if(GameBoard.board[0].every(isX) || GameBoard.board[1].every(isX) ||
    GameBoard.board[2].every(isX)) {
      document.getElementById('gameMessage').innerText = "Player 1 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (GameBoard.board[0].every(isO) || GameBoard.board[1].every(isO) ||
    GameBoard.board[2].every(isO)) {
      document.getElementById('gameMessage').innerText = "Player 2 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (transposedBoard[0].every(isX) || transposedBoard[1].every(isX) ||
    transposedBoard[2].every(isX)) {
      document.getElementById('gameMessage').innerText = "Player 1 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (transposedBoard[0].every(isO) || transposedBoard[1].every(isO) ||
    transposedBoard[2].every(isO)) {
      document.getElementById('gameMessage').innerText = "Player 2 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (GameBoard.board[0][0] === 'X' && GameBoard.board[1][1] === 'X' &&
    GameBoard.board[2][2] === 'X') {
      document.getElementById('gameMessage').innerText = "Player 1 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (GameBoard.board[0][0] === 'O' && GameBoard.board[1][1] === 'O' &&
    GameBoard.board[2][2] === 'O') {
      document.getElementById('gameMessage').innerText = "Player 2 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (GameBoard.board[0][2] === 'X' && GameBoard.board[1][1] === 'X' &&
    GameBoard.board[2][0] === 'X') {
      document.getElementById('gameMessage').innerText = "Player 1 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    } else if (GameBoard.board[0][2] === 'O' && GameBoard.board[1][1] === 'O' &&
    GameBoard.board[2][0] === 'O') {
      document.getElementById('gameMessage').innerText = "Player 2 is the Winner";
      document.getElementById('startGameButton').innerText = "Start Game";
      GameBoard.removeButtons();
    }
  }

  const startGame = () => {
    resetBoard();
    GameBoard.printBoard();
    Game.turnCount = 0;
    GameBoard.removeButtons();
    GameBoard.createButtons();
    document.getElementById('gameMessage').innerText = "Player 1, please begin the game";
    document.getElementById('startGameButton').innerText = "Reset Game";
  }

  return {turnCount, startGame, checkWinner};
})();

let startGameButton = document.getElementById('startGameButton');
startGameButton.addEventListener('click', Game.startGame);