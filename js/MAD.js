"use strict";


class MAD extends BaseChess {

  constructor () {
    super();

    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7");
    // this.board.position(this.game.fen(),false);
  }

  move(from,to) {
    this.madMove(from,to,false);
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
      this.madMove(moves[i].from,moves[i].to,true);
      // See if it leads to being in check
      this.flipTurn();
      // We want to look for moves that result in check (but that don't include a missing king,
      // which also ellicits a check???) because we want to allow king captures since it's funny.
      if (this.game.in_check() && /.*k.*K.*/.test(this.game.fen())) {
        console.log(moves[i]);
        // This move puts you in check so you can't legally choose it
        moves.splice(i,1);
      }
      // Undo it by loading the original fen
      this.game.load(fen);
    }

    return moves;
  }

  madMove(from,to,silent) {
    let move = super.move(from,to,silent);

    if (/c|e/.test(move.flags)) {
      this.game.remove(to);
    }

    if (!silent) {
      setTimeout(() => {
        this.board.position(this.game.fen(),false);
        if (move.piece === 'k' && /c/.test(move.flags)) {
          this.showResult(true,move.color === 'w' ? 'b' : 'w');
          this.gameOver = true;
        }
      },this.config.moveSpeed);
    }
  }
}
