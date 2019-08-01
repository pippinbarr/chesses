"use strict";

/*****************

Chesses
Pippin Barr

******************/


let chess;

$(document).ready(setup);

function setup() {

  let title = "CHESSES";
  for (let i = 0; i < title.length; i++) {
    $('#title').append(`<div class="letter">${title[i]}</div>`)
  }

  let menu = [
    "GRAVITY",
    "M.A.D.",
    "MIRROR",
    "MOMENTUM",
    "PAWNS",
    "SLOTS",
    "SWAPS",
  ];

  for (let i = 0; i < menu.length; i++) {
    let marker = menu[i].indexOf('.')===-1?menu[i]:'MAD';
    let $item = $(`<div class="menu-item" id="${marker}"></div>`);
    $item.data('game',marker);
    for (let j = 0; j < menu[i].length; j++) {
      $item.append(`<div class="letter">${menu[i][j]}</div>`)
    }
    $('#menu').append($item);
  }

  $('#title').on('click', titleClicked);

  $('.menu-item').on('click', menuClicked);
}

function titleClicked () {
  $('#game').slideUp(() => {
    $('.menu-item').slideDown();
  });
}

function menuClicked () {

  switch ($(this).data('game')) {
    case 'GRAVITY':
    chess = new Gravity();
    break;

    case 'SWAPS':
    chess = new Swaps();
    break;

    case 'M.A.D.':
    chess = new MAD();
    break;

    case 'PAWNS':
    chess = new Pawns();
    break;

    case 'SLOTS':
    chess = new Slots();
    break;

    case 'MOMENTUM':
    chess = new Momentum();
    break;

    case 'MIRROR':
    chess = new Mirror();
    break;
  }

  $('.menu-item').not(`#${$(this).data('game')}`).slideUp(500,() => {
    // $('#menu').hide();
    $('#game').slideDown(() => {
      // console.log("slid")
    });
  });
}
