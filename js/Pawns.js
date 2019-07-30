"use strict";


class Pawns extends BaseChess {

  constructor () {
    super();

    this.game.load('ppppkppp/pppppppp/pppppppp/pppppppp/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPKPPP w - - 0 1');
    this.board.position(this.game.fen(),false);
  }
}
