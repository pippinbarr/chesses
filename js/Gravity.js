"use strict";


class Gravity extends BaseChess {

  constructor () {
    super();

    $('#board').css({
      transform: 'rotate(90deg)'
    });
    let stable_rotate = '.square-55d63 .piece-417db{transform: rotate(-90deg)}'
    $('#pieces-rotation').html(stable_rotate)


    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

    // PROMOTION POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/pPPPPPPK/7P w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

    // MISSING CHECK TEST POSITION?
    // this.game.load("rnbqkbnr/ppp1pppp/1Bn5/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

    // UPWARD CAPTURE TEST POSITION?
    // this.game.load("rnbqkbnR/ppp1pppp/1Bn5/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

  }

  getMoves(square) {
    let options = {
      verbose: true,
      legal: false
    }
    if (square !== undefined) options.square = square;
    let moves = this.game.moves(options);

    // Remember the real position
    let fen = this.game.fen();
    for (let i = moves.length - 1; i >= 0; i--) {
      // Try the proposed move
      this.gravityMove(moves[i].from,moves[i].to,true);
      // See if it leads to being in check
      this.flipTurn();
      if (this.game.in_check()) {
        // This move puts you in check so you can't legally choose it
        moves.splice(i,1);
      }
      // Undo it by loading the original fen
      this.game.load(fen);
    }

    return moves;
  }

  move(from,to) {
    this.disableInput();
    this.gravityMove(from,to,false);
  }

  gravityMove(from,to,silent) {
    if (!silent) {
      // Clear all highlights from the board (a new turn is about to begin)
      this.clearHighlights();
      this.disableInput();
    }

    let movedPiece = this.game.get(from);

    // MAKE THE BASE MOVE (PRE-GRAVITY)
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    move = this.game.move(move,{legal: false});

    if (move.flags.indexOf('p') !== -1) movedPiece.type = 'q';

    if (!silent) {
      this.board.position(this.game.fen(),true);
      if (move && (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1)) {
        captureSFX.play();
      }
      else {
        placeSFX.play();
      }
    }

    let files = "abcdefgh";

    // MAKE THE MOVED PIECE FALL

    let toRank = to[1];
    let toFile = to[0];
    let toFileIndex = files.indexOf(toFile);

    let placed = false;
    if (!silent) console.log("Looking to make moved piece fall...");
    for (let f = toFileIndex + 1; f < 8; f++) {
      let square = files[f] + toRank;
      let piece = this.game.get(square);
      if (piece !== null) {
        this.game.remove(toFile + toRank);
        this.game.put({ type: movedPiece.type, color: movedPiece.color}, files[f - 1] + toRank);
        placed = true;
        break;
      }
    }

    if (!placed) {
      let square = files[7] + toRank;
      this.game.remove(toFile + toRank);
      this.game.put({ type: movedPiece.type, color: movedPiece.color}, square);
      console.log("Didn't place piece, so putting it at the bottom.")
    }

    if (!silent) {
      setTimeout(() => {
        this.board.position(this.game.fen(),true);
        setTimeout(() => { attackSFX.play(); }, this.config.moveSpeed*1.1);
      },this.config.moveSpeed * 1.1);
    }

    // ADJUST TO THE HOLE MADE BY MOVING THE PIECE

    // Go through all piece above the location where the piece moved from and have them fall
    let fromRank = from[1];
    let fromFile = from[0];

    let fromFileIndex = files.indexOf(fromFile);

    if (silent) {
      for (let f = fromFileIndex - 1; f >= 0; f--) {
        let square = files[f] + fromRank;
        let piece = this.game.get(square);
        if (piece !== null) {
          this.game.remove(square);
          this.game.put({ type: piece.type, color: piece.color}, files[f+1] + fromRank);
        }
      }
    }
    else {
      let f = fromFileIndex - 1;
      let gravityInterval = setInterval(() => {
        let square = files[f] + fromRank;
        let piece = this.game.get(square);
        if (piece !== null) {
          console.log("Moving down a " + piece.type);
          this.game.remove(square);
          this.game.put({ type: piece.type, color: piece.color}, files[f+1] + fromRank);
          this.board.position(this.game.fen(),true);
          setTimeout(() => { attackSFX.play(); }, this.config.moveSpeed*1.1);
        }
        f--;
        if (f < 0) {// || piece === null) {
          clearInterval(gravityInterval);

          // this.changeTurnTo(this.game.turn() === 'w' ? 'b' : 'w');

          // THIS IS WHERE WE CAN CHECK FOR A RESULT
          this.moveCompleted();
        }
      }, this.config.moveSpeed * 1.1);
    }
  }
}
