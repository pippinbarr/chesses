"use strict";


class Random extends BaseChess {

  constructor () {
    super();

    let validBoardFound = false;
    while (!validBoardFound) {
      this.loadRandomBoard();
      if (this.game.in_check()) {
        continue;
      }
      this.flipTurn();
      if (this.game.in_check()) {
        continue;
      }
      validBoardFound = true;
    }
    this.flipTurn();
    this.board.position(this.game.fen(),false);
  }

  loadRandomBoard() {
    // let pieces = 'prnbq'; // All pieces equally likely
    let pieces = 'pppppppprrnnbbq'; // Probability distribution of chess

    let board = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        let piece = pieces.charAt(Math.floor(Math.random() * pieces.length));
        piece = (Math.random() < 0.5) ? piece : piece.toUpperCase();
        if (piece === 'P' && i === 0) piece = 'Q';
        else if (piece === 'p' && i === 7) piece = 'q';
        row.push(piece);
      }
      board.push(row);
    }

    // Place white king
    let row = Math.floor(Math.random() * board.length);
    let col = Math.floor(Math.random() * board[0].length);
    board[row][col] = 'k';

    let row2 = Math.floor(Math.random() * board.length);
    let col2 = Math.floor(Math.random() * board[0].length);
    while (row2 === row && col2 === col) {
      row2 = Math.floor(Math.random() * board.length);
      col2 = Math.floor(Math.random() * board[0].length);
    }
    board[row2][col2] = 'K';

    let fen = '';
    for (let i = 0; i < board.length; i++) {
      fen += board[i].join('');
      if (i < board.length-1) fen += '/';
    }
    fen += ' w - - 0 1';

    this.game.load(fen);
  }
}
