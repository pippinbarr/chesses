"use strict";


class Clones extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    super.move(from,to);
    this.game.put({type: this.lastMove.piece, color: this.lastMove.color},from);
    this.board.position(this.game.fen(),false);
  }

}
