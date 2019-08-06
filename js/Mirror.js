"use strict";


class Mirror extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    // Calculate the opposite move if one is available
    let files = 'abcdefgh';
    let ranks = '12345678';

    let oppositeFrom = files.charAt(7 - files.indexOf(from[0])) + ranks.charAt(7 - ranks.indexOf(from[1]));
    let oppositeTo = files.charAt(7 - files.indexOf(to[0])) + ranks.charAt(7 - ranks.indexOf(to[1]));

    let oppositePiece = this.game.get(oppositeFrom);

    // Make the original move
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    move = this.game.move(move);

    if (oppositePiece !== null) {
      if (oppositeFrom !== to) this.game.remove(oppositeFrom);
      this.game.put({ type: oppositePiece.type, color: oppositePiece.color }, oppositeTo);

      setTimeout(() => {

      }, this.config.moveSpeed * 1.1);
    }

    this.board.position(this.game.fen(), true);

    this.clearHighlights();

  }
}
