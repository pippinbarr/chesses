"use strict";


class Quantum extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    this.from = from;
    let moves = this.game.moves({
      square: from,
      verbose: true,
      legal: false
    });
    super.move(from,to);
    for (let i = 0; i < moves.length; i++) {
      this.game.put({type: moves[i].piece, color: moves[i].color},moves[i].to);
    }
    this.board.position(this.game.fen(),false);
  }

}
