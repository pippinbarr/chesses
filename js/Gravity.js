"use strict";


class Gravity extends BaseChess {

  constructor () {
    super();

    $('#board').css({
      transform: 'rotate(90deg)'
    });
  }

  move(from,to) {
    super.move(from,to);

    let movedPiece = this.game.get(to);

    let files = "abcdefgh";

    // Go through all piece above the location where the piece moved from and have them fall
    let fromRank = from[1];
    let fromFile = from[0];

    let fromFileIndex = files.indexOf(fromFile);

    for (let f = fromFileIndex - 1; f >= 0; f--) {
      let square = files[f] + fromRank;
      let piece = this.game.get(square);
      if (piece !== null) {
        this.game.remove(square);
        this.game.put({ type: piece.type, color: piece.color}, files[f+1] + fromRank);
      }
    }

    // Go through the squares below the piece that moves and find the resting place
    let toRank = to[1];
    let toFile = to[0];

    let toFileIndex = files.indexOf(toFile);

    let placed = false;
    for (let f = toFileIndex + 1; f < 8; f++) {
      let square = files[f] + toRank;
      let piece = this.game.get(square);

      console.log("checking " + square)

      if (piece !== null) {
        this.game.remove(toFile + toRank);
        this.game.put({ type: movedPiece.type, color: movedPiece.color}, files[f - 1] + toRank);
        placed = true;
        break;
      }
    }

    if (!placed) {
      let square = files[7] + toRank;
      this.game.remove(toFile + toRank);
      this.game.put({ type: movedPiece.type, color: movedPiece.color}, square);
    }

    setTimeout(() => {
      this.board.position(this.game.fen(),true);
    },this.config.moveSpeed);
  }
}
