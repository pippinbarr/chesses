"use strict";


class Slots extends BaseChess {

  constructor () {
    super();
    this.pieces = 'prnbq';
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = this.game.get(square);
    let validPiece = (piece !== null && piece.color === this.game.turn());

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      // Choose a random piece and replace the current piece
      this.replaceWithRandomPiece(square);

      this.highlightMoves(square);
      this.highlight(square);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      // We don't allow reselection at this point, you're stuck with the piece you chose to move
      if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        this.move(this.from,to);
      };
    }
  }

  replaceWithRandomPiece(square) {
    let piece = this.game.get(square);
    if (piece !== null && piece.type !== 'k') {
      let type = this.pieces.charAt(Math.floor(Math.random() * this.pieces.length));
      this.game.remove(square);
      this.game.put({ type: type, color: this.game.turn() }, square);
      this.board.position(this.game.fen(),false);
    }
  }
}
