"use strict";


class Fate extends BaseChess {

  constructor () {
    super();
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find('.piece-417db');
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      let moves = this.getMoves(square);
      let moveIndex = Math.floor(Math.random() * moves.length);
      this.move(this.from,moves[moveIndex].to);
    }
  }

}
