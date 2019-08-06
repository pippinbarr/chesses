"use strict";


class Quantum extends BaseChess {

  constructor () {
    super();

    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7");
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
      this.quantumMove(moves[i].from,moves[i].to,true);
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

  move(from,to,silent) {
    this.quantumMove(from,to,false);
  }

  quantumMove(from,to,silent) {
    let moves = this.game.moves({
      square: from,
      verbose: true,
      legal: false
    });

    let move = super.move(from,to,silent);

    let piece = this.game.get(to);

    if (piece.type !== 'k') { // Only one king
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].to === to) continue;
        this.game.put({type: moves[i].piece, color: moves[i].color},moves[i].to);
      }
    }

    if (!silent) {
      this.board.position(this.game.fen(),true);
      setTimeout(() => {
        if (move && (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1)) {
          for (let i = 0; i < moves.length; i++) captureSFX.play();
        }
        else {
          for (let i = 0; i < moves.length; i++) placeSFX.play();
        }
      },this.config.moveSpeed * 1.1);
    }
  }
}
