"use strict";


class Swaps extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    move = this.game.move(move);

    this.lastMove = move;

    // Clear all highlights from the board (a new turn is about to begin)
    this.clearHighlights();

    if (/c|e/.test(this.lastMove.flags)) {
      this.game.put({
        type: this.lastMove.captured,
        color: this.lastMove.color === 'w' ? 'b' : 'w',
      },from);
    }

    // Update the board based on the new position
    this.board.position(this.game.fen(),true);

    setTimeout(() => {
      if (move.flags.indexOf('c') !== -1 || move.flags.indexOf('e') !== -1) {
        captureSFX.play();
      }
      else {
        placeSFX.play();
      }
    },this.config.moveSpeed);

    // Reset the move tracking
    this.from = null;
  }
}
