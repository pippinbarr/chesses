"use strict";

/*****************

Chesss
Pippin Barr

******************/

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav']
});

let gameOver = false;

let firstClick = true;
let board;
let game;
let from;
let lastMove = '';

let config = {
  showNotation: false,
  moveSpeed: 200,
  draggable: false,
  position: 'start',
  onMoveEnd: () => {
  }
};

$(document).ready(setup);

function setup() {
  board = ChessBoard('board', config);
  game = new Chess();

  board.position(game.fen(),false);

  from = null;
  lastMove = null

  //setupTestbed();

  $('.square-55d63').on('click', squareClicked);
  $('.option').on('click', menuClicked);
  $('#jonathan').on('click',() => {
    window.open('https://jonathanlessard.net/','_blank');
  });
  $('#pippin').on('click',() => {
    window.open('https://www.pippinbarr.com/','_blank');
  });
}

function squareClicked (event) {
  // Find out the notation of the square and also the element representing the piece
  let square = $(this).attr('data-square');
  let piece = $(this).find('.piece-417db');
  let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(game.turn()) !== -1);

  if (validPiece) {
    if (firstClick) {
      $('#title').hide();
      $('#author').hide();
      firstClick = false;
    }
    highlightMoves(square);
    highlight(square);
  }

  else if (from !== null && $(event.currentTarget).hasClass('highlight1-32417')) {
    let to = $(event.currentTarget).attr('data-square');

    if (game.turn() === 'w') {
      moveWhite({from: from, to: to});
    }
    else {
      moveBlack({from: from, to: to});
    }
  }
}

function menuClicked () {
  $('#menu').slideUp(500,() => {
    $('#menu').hide();
    $('#game').slideDown();
  });
}

function resetToMenu () {
  $(document).off('click');
  document.location.reload();
}

function highlightMoves (square) {
  clearHighlights();

  from = square;

  let moves = game.moves({
    square: from,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  moves.forEach((move) => {
    highlight(move.to);
  });
}

function highlight (square) {
  $('.square-'+square).addClass(`highlight1-32417`);
}

function clearHighlights () {
  $('.square-55d63').removeClass(`highlight1-32417`);
}

function moveWhite(move) {
  if (gameOver) return;

  move.promotion = 'q';

  makeMove(move,false);

  if (gameOver) return;
  clearHighlights();
}

function moveBlack(move) {
  if (gameOver) return;

  makeMove(move,false);
  clearHighlights();

  if (gameOver) return;
}


function undo() {
  game.undo();
  states.shift();
}

function makeMove(move,simulate) {

  move = game.move(move);

  if (move === null) {
    throw "INVALID MOVE ATTEMPTED";
  }

  // Animate the move (we'll animate back if it's an attack/non-capture)
  board.position(game.fen(),true);

  setTimeout(() => {
    console.log(move);
    if (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1) {
      captureSFX.play();
    }
    else {
      placeSFX.play();
    }
  },config.moveSpeed)
}
