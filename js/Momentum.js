"use strict";


class Momentum extends BaseChess {

  constructor () {
    super();
  }

  move(from,to) {

    // Make the initial move
    super.move(from,to);

    if (this.lastMove.piece === 'n') {
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

    setTimeout(() => {
      this.game.remove(to);
      this.game.put({ type: this.lastMove.piece, color: this.lastMove.color }, destinationSquare);
      this.board.position(this.game.fen(),true);
    }, this.config.moveSpeed * 1.1);
  }
}
