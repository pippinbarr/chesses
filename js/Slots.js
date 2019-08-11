"use strict";


class Slots extends BaseChess {

  constructor () {
    super();

    // CHECKMATE POSITION
    // this.game.load("2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // STALEMATE POSITION
    // this.game.load("5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7");
    // this.board.position(this.game.fen(),false);

    // CASTLING POSITION
    // this.game.load("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2Q w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);

    // "PROMOTION" POSITION
    // this.game.load("PPP1k1PP/pppppppp/8/8/8/8/PPPPPPPp/R3Kppp w KQkq - 0 7");
    // this.board.position(this.game.fen(),false);
  }

  squareClicked(event) {
    if (!this.inputEnabled) return;

    this.disableInput();

    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = this.game.get(square);
    let validPiece = (piece !== null && piece.color === this.game.turn());

    if (this.from === null && validPiece) {
      // Check whether the piece selected could not move no matter what
      if (this.getPossibleMoves(square).length === 0) {
        // Invalid piece selection (it couldn't make a legal move no matter what piece it was)
        $(`.square-${square} .piece-417db`).effect('shake', { times: 1, distance: 2 }, 50, () => {
          this.enableInput();
        });
        return;
      }

      // We haven't selected a move yet + a piece of the correct colour was selected
      // Replace the current piece with a random piece if it's not the king
      if (this.game.get(square).type === 'k') {
        this.selectMove(square);
      }
      else {
        let randomSteps = 10;
        let slotInterval = setInterval(() => {
          this.replaceWithRandomPiece(square);
          this.board.position(this.game.fen(),false);
          randomSteps--;
          attackSFX.play();
          if (randomSteps == 0) {
            clearInterval(slotInterval);
            this.selectMove(square);
          }
        },100);
      }
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      // We don't allow reselection at this point, you're stuck with the piece you chose to move
      if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        this.move(this.from,to);
      }
      else {
        // If they didn't click a highlight we'll need to reenable input for them to try again
        this.enableInput();
      }
    }
    else {
      // They clicked something that doesn't matter, so just renable input for another attempt
      this.enableInput();
    }
  }

  selectMove(square) {
    let moves = this.getMoves(square);
    let piece = this.game.get(square);
    let strandedPawn = piece.type === 'p' && ((piece.color === 'w' && square[1] === '8') || (piece.color === 'b' && square[1] === '1'));
    // console.log(piece,square[1]);
    if (moves.length === 0 || strandedPawn) {
      if (this.game.in_check()) {
        this.showResult(true,this.getTurn(false));
      }
      else {
        let turnName = this.game.turn() === 'w' ? 'WHITE' : 'BLACK';
        this.showMessage("CANNOT MOVE");
        $(`.square-${square} .piece-417db`).effect('shake', { times: 1, distance: 2 }, 50, () => {
        });
        setTimeout(() => {
          this.hideMessage();
          this.changeTurnTo(this.game.turn() === 'w' ? 'b' : 'w');
          this.changeTurn();
          this.from = null;
        },1000);
      }
    }
    else {
      this.flipTurn();
      if (this.game.in_check()) {
        this.flipTurn();
        this.showResult(true,this.game.turn());
      }
      else {
        this.flipTurn();
        this.enableInput();
        this.from = square;
        this.highlightMoves(moves);
      }
    }
  }

  replaceWithRandomPiece(square) {
    let pieces = 'prnbq';
    let piece = this.game.get(square);
    if (piece !== null && piece.type !== 'k') {
      let type = pieces.charAt(Math.floor(Math.random() * pieces.length));
      while (type === piece.type) {
        type = pieces.charAt(Math.floor(Math.random() * pieces.length));
      }
      this.game.remove(square);
      this.game.put({ type: type, color: this.game.turn() }, square);
    }
  }

  // Get all possible moves from a position (taking into account that any piece
  // other than the king can be any piece)
  getPossibleMoves(square) {
    let pieces = 'prnbq';
    let moves = [];

    if (this.game.get(square).type === 'k') {
      moves = this.game.moves({square: square,verbose:true});

      for (let i = moves.length - 1; i >= 0; i--) {
        if (this.illegalCastleMove(moves[i])) {
          moves.splice(i,1);
        }
      }
    }
    else {
      // Find every move for this piece with it being any piece!
      let fen = this.game.fen();
      for (let i = 0; i < pieces.length; i++) {
        this.game.put({type:pieces[i],color:this.game.turn()},square);
        moves.push(...this.game.moves({square: square,verbose:true}));
        this.game.load(fen);
      }
    }
    return moves;
  }

  moveCompleted() {
    this.from = null;
    this.changeTurn();
  }

  getMoves(square) {
    let options = {
      verbose: true,
    }
    if (square !== undefined) options.square = square;
    let moves = this.game.moves(options);
    if (this.game.get(square).type === 'k') {
      for (let i = moves.length - 1; i >= 0; i--) {
        if (this.illegalCastleMove(moves[i])) {
          moves.splice(i,1);
        }
      }
    }

    return moves;
  }

  illegalCastleMove(move) {
    if (/k/.test(move.flags)) {
      if (this.game.turn() === 'w' && this.game.get('h1').type !== 'r') {
        return true;
      }
      else if (this.game.turn() === 'b' && this.game.get('h8').type !== 'r') {
        return true;
      }
    }
    else if (/q/.test(move.flags)) {
      if (this.game.turn() === 'w' && this.game.get('a1').type !== 'r') {
        return true;
      }
      else if (this.game.turn() === 'b' && this.game.get('a8').type !== 'r') {
        return true;
      }
    }

  }
}
