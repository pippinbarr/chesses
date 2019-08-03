"use strict";

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav']
});
const attackSFX = new Howl({
  src: ['assets/sounds/attack.wav']
});


class BaseChess {

  constructor () {
    this.setup();
  }

  setup () {
    this.config = {
      draggable: false,
      position: 'start',
      onMoveEnd: () => {
      },
      moveSpeed: 200,
      showNotation: false
    };

    this.board = ChessBoard('board', this.config);
    this.game = new Chess();

    this.from = null;
    this.lastMove = null;

    $('#board').css({
      transform: 'rotate(0deg)'
    });

    $('.square-55d63').css({
      transform: 'rotate(0deg)'
    });

    this.enableInput();
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find('.piece-417db');
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      let moves = this.getMoves(square);
      this.highlightMoves(moves);
      this.highlight(square);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      if (validPiece) {
        // But now we're selecting another valid piece to move, so we should rehilight
        let moves = this.getMoves(square);
        this.highlightMoves(moves);
        this.highlight(square);
      }
      else if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        this.move(this.from,to);
      };
    }
  }

  getMoves(square) {
    this.from = square;
    let moves = this.game.moves({
      square: square,
      verbose: true
    });
    return moves;
  }

  // Highlights the moves available to the piece on the given square
  // and sets it up as the current 'from'
  highlightMoves(moves) {
    this.clearHighlights();

    // exit if there are no moves available for this square
    if (moves.length === 0) return 0;

    moves.forEach((move) => {
      this.highlight(move.to);
    });

    return moves.length;
  }

  move(from,to) {
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    move = this.game.move(move);

    this.lastMove = move;

    // Clear all highlights from the board (a new turn is about to begin)
    this.clearHighlights();

    // Update the board based on the new position
    this.board.position(this.game.fen(),true);

    setTimeout(() => {
      if (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1) {
        captureSFX.play();
      }
      else {
        placeSFX.play();
      }
    },this.config.moveSpeed);

    // Reset the move tracking
    this.from = null;
  }

  // Remove highlights from every square on the board
  clearHighlights() {
    $('.square-55d63').removeClass(`highlight1-32417`);
  }

  clearHighlight(element) {
    $(element).removeClass(`highlight1-32417`);
  }

  // Highlight the specified square
  highlight(square) {
    $('.square-'+square).addClass(`highlight1-32417`);
  }


  enableInput() {
    $('.square-55d63').on('click', (event) => {
      this.squareClicked(event);
    });
  }

  disableInput() {
    $('.square-55d63').off('click');
  }

  changeTurnTo(color) {
    let fen = this.game.fen();
    let fenArray = fen.split(' ');
    fenArray[1] = color;
    fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
    fen = fenArray.join(' ');
    this.game.load(fen);
  }

  flipTurn() {
    this.changeTurnTo(this.game.turn() === 'w' ? 'b' : 'w');
  }

  showResult(win,color) {
    if (win) {
      if (color === 'w') {
        $('#result').text('WHITE WINS');
      }
      else {
        $('#result').text('BLACK WINS');
      }
    }
    else {
      $('#result').text('DRAW');
    }
    $('#result').slideDown();
    this.disableInput();
  }
}
