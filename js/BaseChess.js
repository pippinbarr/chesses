"use strict";

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav', 'assets/sounds/place.mp3']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav', 'assets/sounds/capture.mp3']
});
const attackSFX = new Howl({
  src: ['assets/sounds/attack.wav', 'assets/sounds/attack.mp3']
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

    let stable_rotate = '.square-55d63 .piece-417db{transform: rotate(0deg)}'
    $('#pieces-rotation').html(stable_rotate)

    this.changeTurn();
    this.enableInput();
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find('.piece-417db');
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      this.from = square;
      let moves = this.getMoves(square);
      if (moves.length === 0) {
        $(`.square-${square} .piece-417db`).effect('shake', { times: 1, distance: 2 }, 50, () => {
        });
        this.from = null;
        this.clearHighlights();
        return;
      }
      this.highlightMoves(moves);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      if (validPiece) {
        // But now we're selecting another valid piece to move, so we should rehilight
        let moves = this.getMoves(square);
        if (moves.length === 0) {
          $(`.square-${square} .piece-417db`).effect('shake', { times: 1, distance: 2 }, 50, () => {
          });
          this.from = null;
          this.clearHighlights();
          return;
        }
        else {
          this.from = square;
        }
        this.highlightMoves(moves);
      }
      else if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        console.log(this.from,to)
        this.move(this.from,to);
      };
    }
  }

  getMoves(square) {
    let options = {
      verbose: true,
    }
    if (square !== undefined) options.square = square;
    let moves = this.game.moves(options);
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

  move(from,to,silent) {
    if (silent === undefined) silent = false;

    // if (!silent) this.disableInput();

    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    move = this.game.move(move);

    if (!silent) {
      this.disableInput();

      // Clear all highlights from the board (a new turn is about to begin)
      this.clearHighlights();

      // Update the board based on the new position
      this.board.position(this.game.fen(),true);

      setTimeout(() => {
        if (move && (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1)) {
          captureSFX.play();
        }
        else {
          placeSFX.play();
        }
        this.moveCompleted();
      },this.config.moveSpeed * 1.1);
    }

    return move;
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

  moveCompleted() {
    this.from = null;
    let moves = this.getMoves();
    if (moves.length === 0) {
      if (this.game.in_check()) {
        // CHECKMATE
        this.showResult(true,this.getTurn(false));
      }
      else {
        // STALEMATE
        this.showResult(false);
      }
    }
    else {
      if (this.gameOver) return;
      this.changeTurn();
      this.hideMessage();
    }
  }

  enableInput() {
    if (this.inputEnabled === true) return;
    this.inputEnabled = true;
    $('.square-55d63').on('click', (event) => { this.squareClicked(event); });
  }

  disableInput() {
    if (this.inputEnabled === false) return;
    this.inputEnabled = false;
    $('.square-55d63').off('click');
  }

  changeTurn() {
    if (this.gameOver) return;
    if (this.game.turn() === 'w') {
      $('.board-b72b1').removeClass('blackTurn',250);
      $('.board-b72b1').addClass('whiteTurn',250,() => {
        this.enableInput();
        this.from = null;
      });
    }
    else {
      $('.board-b72b1').removeClass('whiteTurn',250);
      $('.board-b72b1').addClass('blackTurn',250,() => {
        this.enableInput();
        this.from = null;
      });
    }
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
        $('#message').text('WHITE WINS');
      }
      else {
        $('#message').text('BLACK WINS');
      }
    }
    else {
      $('#message').text('STALEMATE');
    }
    $('#message').slideDown();
    this.disableInput();
  }

  showMessage(message) {
    $('#message').text(message);
    $('#message').slideDown();
  }

  hideMessage() {
    $('#message').slideUp();
  }

  getTurn(current) {
    if (current) {
      this.game.turn()
    }
    else {
      return this.game.turn() === 'w' ? 'b' : 'w';
    }
  }
}
