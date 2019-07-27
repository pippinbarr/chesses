"use strict";

/*****************

Chesses
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

  $('.square-55d63').on('click', squareClicked);
  $('.option').on('click', menuClicked);
}

function squareClicked (event) {
  // Find out the notation of the square and also the element representing the piece
  let square = $(this).attr('data-square');
  let piece = $(this).find('.piece-417db');
  let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(game.turn()) !== -1);

  // Check if they clicked on a piece they could conceivably move
  if (validPiece) {
    highlightMoves(square);
    highlight(square);
  }
  // Otherwise check if they clicked on a square they could move the current piece to
  else if (from !== null && $(event.currentTarget).hasClass('highlight1-32417')) {
    let to = $(event.currentTarget).attr('data-square');

    makeMove({from: from, to: to});
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

function undo() {
  game.undo();
  states.shift();
}

function makeMove(move,simulate) {

  move.promotion = 'q';
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
  },config.moveSpeed);

  clearHighlights();
}
