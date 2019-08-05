"use strict";


class Momentum extends BaseChess {

  constructor () {
    super();

    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7");
    // this.board.position(this.game.fen(),false);

  }

  move(from,to) {
    this.momentumMove(from,to,false);
  }

  getMoves(square) {
    let options = {
      verbose: true,
      legal: false
    }
    if (square !== undefined) options.square = square;
    let moves = this.game.moves(options);

    // Remember the real position
    let fen = this.game.fen();
    for (let i = moves.length - 1; i >= 0; i--) {
      // Try the proposed move
      this.momentumMove(moves[i].from,moves[i].to,true);
      // See if it leads to being in check
      this.flipTurn();
      // We want to look for moves that result in check (but that don't include a missing king,
      // which also ellicits a check???) because we want to allow king captures since it's funny.
      if (this.game.in_check()) {
        // This move puts you in check so you can't legally choose it
        moves.splice(i,1);
      }
      // Undo it by loading the original fen
      this.game.load(fen);
    }

    return moves;
  }

  momentumMove(from,to,silent) {
    // Make the initial move
    let move = super.move(from,to,silent);

    if (move.type === 'n') {
      return; // We don't slide knights
    }

    // Now work out sliding behaviour
    let files = 'abcdefgh';
    let ranks = '12345678';
    let piece = this.game.get(from);

    let fromFileIndex = files.indexOf(from[0]);
    let toFileIndex = files.indexOf(to[0]);
    let fromRankIndex = ranks.indexOf(from[1]);
    let toRankIndex = ranks.indexOf(to[1]);

    // THIS WON'T WORK FOR A KNIGHT
    let fileMove = Math.sign(toFileIndex - fromFileIndex);
    let rankMove = Math.sign(toRankIndex - fromRankIndex);

    let startRankIndex = toRankIndex;
    let startFileIndex = toFileIndex;

    let steps = 0;

    let nextRankIndex = startRankIndex + (steps + 1)*rankMove;
    let nextFileIndex = startFileIndex + (steps + 1)*fileMove;
    let nextSquare = files.charAt(nextFileIndex) + ranks.charAt(nextRankIndex);

    let destinationRankIndex = startRankIndex;
    let destinationFileIndex = startFileIndex;

    let valid = (nextRankIndex >= 0 && nextRankIndex < ranks.length && nextFileIndex >= 0 && nextFileIndex < files.length && this.game.get(nextSquare) === null);
    while (valid) {
      destinationRankIndex = nextRankIndex;
      destinationFileIndex = nextFileIndex;
      steps++;
      nextRankIndex = startRankIndex + (steps + 1)*rankMove;
      nextFileIndex = startFileIndex + (steps + 1)*fileMove;
      nextSquare = files.charAt(nextFileIndex) + ranks.charAt(nextRankIndex);
      valid = (nextRankIndex >= 0 && nextRankIndex < ranks.length && nextFileIndex >= 0 && nextFileIndex < files.length && this.game.get(nextSquare) === null)
    }

    let destinationSquare = files.charAt(destinationFileIndex) + ranks.charAt(destinationRankIndex);

    this.game.remove(to);
    this.game.put({ type: move.piece, color: move.color }, destinationSquare);

    if (!silent) {
      setTimeout(() => {
        this.board.position(this.game.fen(),true);
      }, this.config.moveSpeed * 1.1);
    }

  }
}
