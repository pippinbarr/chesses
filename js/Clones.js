"use strict";


class Clones extends BaseChess {

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
    let move = super.move(from,to);
    this.game.put({type: move.piece, color: move.color},from);
    this.board.position(this.game.fen(),false);
  }

}
