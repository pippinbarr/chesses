"use strict";


class MAD extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    super.move(from,to);

    if (/c|e/.test(this.lastMove.flags)) {
      setTimeout(() => {
        this.game.remove(to);
        this.board.position(this.game.fen(),false);
      },this.config.moveSpeed);
    }
  }
}
