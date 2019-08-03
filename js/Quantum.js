"use strict";


class Quantum extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    let moves = this.getMoves(from);
    super.move(from,to);
    for (let i = 0; i < moves.length; i++) {
      this.game.put({type: moves[i].piece, color: moves[i].color},moves[i].to);
    }
    this.board.position(this.game.fen(),false);
  }

}
