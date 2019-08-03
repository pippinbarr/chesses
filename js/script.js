"use strict";

/*****************

Chesses
Pippin Barr

******************/


let chess;

$(document).ready(setup);

function setup() {

  let title = "CHESSES";
  $('#title').text(`${title}`)


  let menu = [
    {
      title: "GRAVITY",
      instructions: "Regular chess, but watch out for the gravity."
    },
    {
      title: "M.A.D",
      instructions: "Mutally assured destruction. You capture them, they capture you."
    },
    {
      title: "MIRROR",
      instructions: "Mirror, mirror, on the wall."
    },
    {
      title: "MOMENTUM",
      instructions: "Pieces keep moving in the direction they moved. Except for knights."
    },
    {
      title: "PAWNS",
      instructions: "That's a lot of pawns."
    },
    {
      title: "RANDOM",
      instructions: "Everyone's here."
    },
    {
      title: "SLOTS",
      instructions: "The piece you choose to move is transformed into a randomly selected piece before moving."
    },
    {
      title: "SWAPS",
      instructions: "Captures are now swaps. Checkmate still applies."
    },
    {
      title: "CLONES",
      instructions: "Do or not do."
    },
  ];

  for (let i = 0; i < menu.length; i++) {
    let marker = menu[i].title.indexOf('.')===-1?menu[i].title:'MAD';
    let $item = $(`<div class="menu-item active" id="${marker}">${menu[i].title}</div>`);
    $item.data('game',marker);
    // for (let j = 0; j < menu[i].title.length; j++) {
    //   $item.append(`<div class="letter">${menu[i].title[j]}</div>`)
    // }
    // let $instructions = $(`<div class="instruction">${menu[i].instructions}</div>`);
    // $item.append($instructions);
    $('#menu').append($item);
  }

  $('#title').on('click', titleClicked);

  $('.menu-item').on('click', menuClicked);
}

function titleClicked () {
  $('.instruction').slideUp();
  $('#result').slideUp();
  $('#game').slideUp(() => {
    $('.menu-item').slideDown();
    $('.menu-item').addClass('active');
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

    case 'MAD':
    chess = new MAD();
    break;

    case 'PAWNS':
    chess = new Pawns();
    break;

    case 'RANDOM':
    chess = new Random();
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

    case 'CLONES':
    chess = new Clones();
    break;
  }

  $('.menu-item').removeClass('active');
  $('.menu-item').not(`#${$(this).data('game')}`).slideUp(500,() => {
    // $('#menu').hide();
    $('#game').slideDown(() => {
      // console.log("slid")
      $(this).find('.instruction').slideDown();
    });
  });
}
