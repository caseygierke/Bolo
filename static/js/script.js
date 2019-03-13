
// --------------------------------------
// Challenge 1: AlterEgo
// --------------------------------------

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function reverse(str){
	if(str === ""){
		return str 
	}else{
		return reverse(str.substr(1)) + str[0]
	}
}

function alterEgo() {
	var name = prompt('What is your name?');
	var name = name.toLowerCase()
	var altEgo = reverse(name);
	var altEgo = altEgo.capitalize();

	// Define global variable
	window.altEgo = altEgo
	var textAnswer = document.createTextNode('Your AlterEgo is '+ altEgo);
	var h1 = document.createElement('h1');
	h1.setAttribute('id', 'altEgo');
	h1.appendChild(textAnswer);
	document.getElementById('flex-box-result').appendChild(h1);

// --------------------------------------
// Challenge 2: Make AlterEgo button
// --------------------------------------

	// Make alterEgoButton
	var button = document.createElement('button');
	button.setAttribute('class', 'btn btn-primary');
	button.setAttribute('onclick', 'getAltEgoImage()');
	var buttonText = document.createTextNode('See '+altEgo);
	button.appendChild(buttonText);
	document.getElementById('flex-box-image-container').appendChild(button);
}

function reset() {
	document.getElementById('altEgo').remove();
	document.getElementById('flex-box-image-container').remove();
}

// Challenge 2

function hndlr(response) {
	for (var i = 0; i < response.items.length; i++) {
	var item = response.items[i];
	// in production code, item.htmlTitle should have the HTML entities escaped.
	document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
	}
}

// console.log(hndlr(altEgo))

// // Load things for searching
// google.load('search', '1');
// google.setOnLoadCallback(OnLoad);
// var search;

// // var keyword = altEgo;

// function OnLoad()
// {
//     search = new google.search.ImageSearch();

//     // search.setSearchCompleteCallback(this, searchComplete, null);

//     search.execute(keyword);
// }

// // function searchComplete()
// function getAltEgoImage()
// {
//     if (search.results && search.results.length > 0)
//     {
//         var rnd = Math.floor(Math.random() * search.results.length);

//         //you will probably use jQuery and something like: $('body').css('background-image', "url('" + search.results[rnd]['url'] + "')");
//         document.body.style.backgroundImage = "url('" + search.results[rnd]['url'] + "')";
//     }
// }

// --------------------------------------
// Challenge 5: Bolo
// --------------------------------------

let boloGame = {
	'you': {'scoreSpan': '#your-bolo-result', 'div': '#your-box', 'potentialScore': 0, 'score': 0},
	'computer': {'scoreSpan': '#computer-bolo-result', 'div': '#computer-box', 'score': 0},
	'die': ['1', '2', '3', '4', '5', '6'],
	'diceSounds': ['diceCup', 'Hillbilly', 'SoundBible'],
	'diceMap': {'1': 100, '5': 50},
	// 'wins': 0,
	// 'draws': 0,
	// 'losses': 0,

}

const YOU = boloGame['you']
const COMPUTER = boloGame['computer']
const numberOfDie = 5;

// Add listeners
document.querySelector('#bolo-roll-button').addEventListener('click', boloRoll);
document.querySelector('#bolo-pass-button').addEventListener('click', boloPass);

function boloRoll() {
	// let dice = randomDice();
	// console.log(dice);
	showDice(YOU);
	// boloPlay();
	// updateScore(card, YOU);
	showScore(YOU);
}

function rollSound() {
	let randSound = boloGame['diceSounds'][Math.floor(Math.random()*3)];
	let sound = new Audio(`static/sounds/${randSound}.wav`);
	sound.play();
}

function randomDice() {
	let randomIndex = Math.floor(Math.random()*6);
	// console.log(randomIndex);
	return boloGame['die'][randomIndex];
	// console.log(boloGame['die'][randomIndex]);
}

function showDice(activePlayer) {
	// Define keep variable, later needs to be dynamic
	let keep = 0;

	// Create a backend array variable to keep track of die
	let dieArray = new Array();

	// // Create a backend variable to score die
	// let potentialScore = 0; 

	// Loop through to get 5 die
	for (i=0; i < numberOfDie; i++) {

		let dieNumber = i;
		let dice = randomDice();

		// Update backend Array
		dieArray.push(dice);

		// Check if there is a potential score
		// See if the dice is in diceMap
		if (dice in boloGame['diceMap']) {
			// Update if it is
			activePlayer['potentialScore'] += boloGame['diceMap'][dice];
		}

		let diceImage = document.createElement('img');
		diceImage.src = `static/images/${dice}.png`;
		// **Need to figure out how to designate something for active/keep
		// diceImage.class = 'play';
		
		// Give the dice an ID
		diceImage.id = 'dice-number-'+ dieNumber;
		
		// // Make dice clickable
		// diceImage.onclick = boloKeep();
		
		diceImage.style.height = '50px';
		diceImage.style.padding = '5px';
		// console.log(diceImage);
		document.querySelector(activePlayer['div']).appendChild(diceImage);
	} 

	let yourDieImages = document.querySelector('#your-box').querySelectorAll('img');
	// console.log(yourDie);
	console.log('Rolling score is '+activePlayer['potentialScore']);
	console.log(dieArray);
	// return potentialScore;
	rollSound();
}

function boloPlay() {
	console.log('That worked');
	// let yourDie = document.querySelector('#your-box').querySelectorAll('img');
	// console.log('#your-box');
}

function boloPass() {
	console.log('You are passing the dice');
}

function updateScore(card, activePlayer) {
	if (card === 'A') {
	// If adding 11 keeps me below 21, add 11. Otherwise, add 1
		if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
			activePlayer['score'] += blackjackGame['cardsMap'][card][1];
		} else {
			activePlayer['score'] += blackjackGame['cardsMap'][card][0];
		}
	} else {
		activePlayer['score'] += blackjackGame['cardsMap'][card];
	}
}

function showScore(activePlayer) {
	// document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['potentialScore'];
	let h3 = document.createElement('h3');
	// h3.setAttribute('class', 'btn btn-primary');
	// h3.setAttribute('onclick', 'getAltEgoImage()');
	var potentialScoreText = document.createTextNode(activePlayer['potentialScore']+' on the table...');
	h3.appendChild(potentialScoreText);
	document.getElementById('your-box').appendChild(h3);
}

function boloKeep() {
	console.log("We're here");
}

function changeID() {
	console.log('Here we go');
}