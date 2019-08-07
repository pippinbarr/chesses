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

  let author = 'BY <a href="https://www.pippinbarr.com/" target="_blank">&nbsp;PIPPIN BARR</a>';
  $('#author').html(`${author}`)


  let menu = [
    {
      title: "CLONE",
      instructions: "Do or not do."
    },
    {
      title: "CHANCE",
      instructions: "The piece you choose to move is transformed into a randomly selected piece before moving."
    },
    {
      title: "CROWDED",
      instructions: "Everyone's here."
    },
    {
      title: "GRAVITY",
      instructions: "Regular chess, but watch out for the gravity."
    },
    {
      title: "LITE",
      instructions: "My way or the highway."
    },
    {
      title: "M.A.D",
      instructions: "Mutally assured destruction. You capture them, they capture you."
    },
    // {
    //   title: "MIRROR",
    //   instructions: "Mirror, mirror, on the wall."
    // },
    {
      title: "MOMENTUM",
      instructions: "Pieces keep moving in the direction they moved. Except for knights."
    },

    // {
    //   title: "PAWNS",
    //   instructions: "That's a lot of pawns."
    // },
    {
      title: "QUANTUM",
      instructions: "Here comes everything."
    },
    // {
    //   title: "SWAPS",
    //   instructions: "Captures are now swaps. Checkmate still applies."
    // },


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

  $('.menu-item').on('click', menuClicked);
}

function titleClicked () {
  $('.instruction').slideUp();
  $('#message').slideUp();
  $('#title').removeClass('active');
  $('#game').slideUp(() => {
    $('.menu-item').slideDown();
    $('#author').slideDown();
    $('.menu-item').addClass('active');
    $('.menu-item').on('click', menuClicked);
  });
}

function menuClicked () {

  switch ($(this).data('game')) {
    case 'GRAVITY':
    chess = new Gravity();
    break;

    // case 'SWAPS':
    // chess = new Swaps();
    // break;

    case 'MAD':
    chess = new MAD();
    break;

    // case 'PAWNS':
    // chess = new Pawns();
    // break;

    case 'CROWDED':
    chess = new Random();
    break;

    case 'CHANCE':
    chess = new Slots();
    break;

    case 'MOMENTUM':
    chess = new Momentum();
    break;

    // case 'MIRROR':
    // chess = new Mirror();
    // break;

    case 'CLONE':
    chess = new Clones();
    break;

    case 'QUANTUM':
    chess = new Quantum();
    break;

    case 'LITE':
    chess = new Fate();
    break;
  }

  $('#title').addClass('active');
  $('#title.active').on('click', titleClicked);

  $('.menu-item').removeClass('active');

  $('.menu-item').off('click');

  $('#author').slideUp();
  $('.menu-item').not(`#${$(this).data('game')}`).slideUp(500,() => {
    // $('#menu').hide();
    $('#game').slideDown(() => {
      // console.log("slid")
      $(this).find('.instruction').slideDown();
    });
  });
  $('#message').slideUp();
}
