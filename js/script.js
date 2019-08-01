"use strict";

/*****************

Chesses
Pippin Barr

******************/


let chess;

$(document).ready(setup);

function setup() {
  $('.option').on('click', menuClicked);
}

function menuClicked () {

  switch ($(this).attr('id')) {
    case 'gravity':
    chess = new Gravity();
    break;

    case 'swaps':
    chess = new Swaps();
    break;

    case 'mad':
    chess = new MAD();
    break;

    case 'pawns':
    chess = new Pawns();
    break;

    case 'slots':
    chess = new Slots();
    break;

    case 'momentum':
    chess = new Momentum();
    break;

    case 'mirror':
    chess = new Mirror();
    break;
  }


  $('#menu').slideUp(500,() => {
    $('#menu').hide();
    $('#game').slideDown();
  });
}

function resetToMenu () {
  $(document).off('click');
  document.location.reload();
}
