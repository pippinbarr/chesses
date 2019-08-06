"use strict";


class Fate extends BaseChess {

  constructor () {
    super();

    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7");
    // this.board.position(this.game.fen(),false);
  }

  squareClicked(event) {

    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find('.piece-417db');
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (validPiece && this.getMoves(square).length === 0) {
      $(`.square-${square} .piece-417db`).effect('shake', { times: 1, distance: 2 }, 50, () => {
      });
      return;
    }
    else if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      this.from = square;
      let moves = this.getMoves(square);
      let moveIndex = Math.floor(Math.random() * moves.length);
      this.move(this.from,moves[moveIndex].to);
    }
  }
}
