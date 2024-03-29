/* card logic */

//var suites = ["CLUBS","DIAMONDS","HEARTS","SPADES"]
var suites = ["clubs","diamonds","hearts","spades"]
//var ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
var ranks = ['a','2','3','4','5','6','7','8','9','10','j','q','k'];


function initializeDeck() {
  var deck = new Array(52)
  var i = 0
  for(var s = 0; s < suites.length; s++) {
    for(var r = 0; r < ranks.length; r++) {
      var card = new Object()
      card.suite = s
      card.rank = r
      deck[i] = card
      i++
    }
  }
  return deck
}

function shuffle(decks) {
  var count = 0
  var total_cards = decks.length * 52
  var all_cards = new Array(total_cards)
  var shuffled_deck = new Array(total_cards)
  for(var d = 0; d < decks.length; d++) {
    for(var c = 0; c < 52; c++) {
      all_cards[count] = decks[d][c]
        count++
    }
  }
  count = 0
  for(var i = 0; i < total_cards; i++) {
    var currentNumber = Math.floor(Math.random()*(total_cards - i))
    shuffled_deck[count] = all_cards[currentNumber]
    all_cards.splice(currentNumber,1)
    count++
  }
  return shuffled_deck
}

function deal(players, shuffled_deck) {
  for(var i = 0; i < players.length; i++) {
    players[i].currentHand = new Array(13)
  }

  var count = 0
  for(var c = 0; c < 13; c++) {
    for(var i = 0; i < players.length; i++) {
      players[i].currentHand[c] = shuffled_deck.pop()
      count++
    }
  }
}

function compareCards(card1, card2) {
  //how to sort //sort by suite //then sort by rank
  if(card1.suite == card2.suite) {
    return card1.rank - card2.rank
  } else {
    return card1.suite - card2.suite
  }
}

function sortHand(player) {
  player.currentHand.sort(compareCards)
}

/* display related functions */

function createDivs(parentDiv, numberOfPlayers) {
  if(null == parentDiv || undefined == parentDiv) {
    parentDiv = "cards"
  }
  var displayDiv = document.getElementById(parentDiv)
  if(null == displayDiv || undefined == displayDiv) {
    return false
  }
  for(var i = 0; i < numberOfPlayers; i++) {
    displayDiv.innerHTML += "<div id='cards-"+i+"'></div>"
  }

  return true
}

function display_cards_for_each_player(players) {
  for(p = 0; p < players.length; p++) {
    display_card_images(players[p].currentHand, "cards-" + players[p].id)
  }
}

function display_card_images(cards, divName) {
  if(divName == null || divName == "") {
    divName = "cards"
  }
  var count = 0
  var rowFlag = "open"
  var displayDiv = document.getElementById(divName)
  var cards_dealt="<table>"
  for(var c = 0; c < cards.length; c++) {
    var currentCard = cards[c]
    if((count % 13) == 0) {
      cards_dealt = cards_dealt + "<tr>"
      rowFlag = "open"
    }
    cards_dealt = cards_dealt + "<td><img src='card-images/" + suites[currentCard.suite] + "-" + ranks[currentCard.rank] + "-75.png'></td>" 
    if((count % 13) == 12) {
      cards_dealt += "</tr>"
      rowFlag = "closed"
    }
    count++
  }
  if(rowFlag == "open") {
    cards_dealt += "</tr>"
      rowFlag = "closed"
  }
  displayDiv.innerHTML = cards_dealt
}

/* the game class */

function game(numberOfPlayers, numberOfDecks) {
  var players = new Array(numberOfPlayers)
  var i = 0
  for(; i < numberOfPlayers; i++) {
    players[i] = new Object()
    players[i].id = i
  }
  this.players = players

  var decks = new Array(numberOfDecks)
  for(i = 0; i < numberOfDecks; i++) {
    decks[i] = initializeDeck()
  }
  this.decks = decks

  this.start = function() {
    //alert("starting new game")
    var shuffled_deck = shuffle(decks)
    //alert("cards shuffled")
    deal(players, shuffled_deck)
    //alert("cards dealt")
    display_cards_for_each_player(players)
  }
}

