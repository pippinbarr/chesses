"use strict";


class Gravity extends BaseChess {

  constructor () {
    super();

    $('#board').css({
      transform: 'rotate(90deg)'
    });

    $('.square-55d63').css({
      transform: 'rotate(-90deg)'
    });
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let $piece = $(event.currentTarget).find('.piece-417db');

    let color, type;

    if ($piece.length > 0) {
      color = $piece.attr('data-piece')[0];
      type = $piece.attr('data-piece')[1].toLowerCase();
    }

    let validPiece = ($piece.length > 0 && color === this.game.turn());

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      let moves = this.getMoves(square);
      this.highlightMoves(moves);
      this.highlight(square);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      if (validPiece) {
        // But now we're selecting another valid piece to move, so we should rehilight
        let moves = this.getMoves(square);
        this.highlightMoves(moves);
        this.highlight(square);
      }
      else if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        this.move(type,color,this.from,to);
      };
    }
  }

  getMoves(square) {
    this.from = square;

    let moves = this.game.moves({
      square: square,
      verbose: true,
      legal: false
    });

    // Remember the real position
    let fen = this.game.fen();
    for (let i = moves.length - 1; i >= 0; i--) {
      // Try the proposed move
      this.gravityMove(moves[i].piece,moves[i].color,moves[i].from,moves[i].to,true);
      // See if it leads to being in check
      this.flipTurn();
      if (this.game.in_check()) {
        // This move puts you in check so you can't legally choose it
        moves.splice(i,1);
      }
      // Undo it by loading the original fen
      this.game.load(fen);
    }

    return moves;
  }

  move(type,color,from,to) {
    this.gravityMove(type,color,from,to,false);
  }

  gravityMove(type,color,from,to,silent) {
    if (!silent) {
      // Clear all highlights from the board (a new turn is about to begin)
      this.clearHighlights();
    }
    // MAKE THE BASE MOVE (PRE-GRAVITY)
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };
    this.game.move(move,{legal: false});

    let movedPiece = this.game.get(to);

    // console.log("gravityMove("+from+","+to+","+silent);
    // console.log(movedPiece);

    if (!silent) {
      this.board.position(this.game.fen(),true);
    }

    let files = "abcdefgh";

    // MAKE THE MOVED PIECE FALL

    let toRank = to[1];
    let toFile = to[0];
    let toFileIndex = files.indexOf(toFile);

    let placed = false;
    for (let f = toFileIndex + 1; f < 8; f++) {
      let square = files[f] + toRank;
      let piece = this.game.get(square);

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

    if (!silent) {
      setTimeout(() => {
        this.board.position(this.game.fen(),true);
        setTimeout(() => { attackSFX.play(); }, this.config.moveSpeed*1.1);
      },this.config.moveSpeed * 1.1);
    }

    // ADJUST TO THE HOLE MADE BY MOVING THE PIECE

    // Go through all piece above the location where the piece moved from and have them fall
    let fromRank = from[1];
    let fromFile = from[0];

    let fromFileIndex = files.indexOf(fromFile);


    if (silent) {
      for (let f = fromFileIndex - 1; f >= 0; f--) {
        let square = files[f] + fromRank;
        let piece = this.game.get(square);
        if (piece !== null) {
          this.game.remove(square);
          this.game.put({ type: piece.type, color: piece.color}, files[f+1] + fromRank);
        }
      }
    }
    else {
      let f = fromFileIndex - 1;
      let gravityInterval = setInterval(() => {
        let square = files[f] + fromRank;
        let piece = this.game.get(square);
        if (piece !== null) {
          this.game.remove(square);
          this.game.put({ type: piece.type, color: piece.color}, files[f+1] + fromRank);
          this.board.position(this.game.fen(),true);
          setTimeout(() => { attackSFX.play(); }, this.config.moveSpeed*1.1);
        }
        f--;
        if (f < 0 || piece === null) {
          clearInterval(gravityInterval);

          // this.changeTurnTo(this.game.turn() === 'w' ? 'b' : 'w');

          // THIS IS WHERE WE CAN CHECK FOR A RESULT
        }
      }, this.config.moveSpeed * 1.1);
    }
  }
}
