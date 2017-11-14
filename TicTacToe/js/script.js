var origBoard;
var huPlayer = 'X';
var aiPlayer = 'O';
const winCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[6,4,2],
	[0,3,6],
	[1,4,7],
	[2,5,8]
];
const cells = document.querySelectorAll('.cell');

function startGame(){
	document.querySelector('.endGame').style.display = 'none';
	document.querySelector('.startGame').style.display = 'none';
	document.querySelector('.startGame').innerText = 'Reset';
	origBoard = Array.from(Array(9).keys());
	for(var i=0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
	if (aiPlayer == 'X') {
		setTimeout(() => {
		cells[0].innerText = 'X';
		origBoard[0] = 'X';
		}, 500);
	}
}
function turnClick(){
	if (typeof origBoard[this.id] == 'number') {
		if (turn(this.id, huPlayer)) setTimeout(() => turn(bestSpot(), aiPlayer), 500);
	}
}
function turn(id, player){
	origBoard[id] = player;
	document.getElementById(id).innerText = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon){
		gameOver(gameWon);
		return false;
	}
	if (checkTie()) return false;
	return true;
}
function checkWin(board, player) {
	let plays = [];
	for(var i =0 ; i < board.length; i++) {
		if(board[i] == player) plays.push(i);
	}
	let gameWon = null;
	for(var i=0; i<winCombos.length; i++){
		if ((plays.indexOf(winCombos[i][0]) > -1) &&
			(plays.indexOf(winCombos[i][1]) > -1) &&
			(plays.indexOf(winCombos[i][2]) > -1)) {
			gameWon = {index: i , player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	var winArr = winCombos[gameWon.index];
	for (var i=0; i<3; i++){
		document.getElementById(winArr[i]).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	setTimeout(() => declareWinner(gameWon.player == huPlayer ? 'You win!': 'You lose :('), 500);
}
function emptySquares(board){
//	console.log(origBoard.filter(el => typeof el == 'number'));
	return board.filter(el => typeof el == 'number');
}

function bestSpot(){
	return minimax(origBoard, aiPlayer).index ;
}

function minimax(newBoard, player){
	var availSpot = emptySquares(newBoard);
	if (checkWin(newBoard, player)) {
		return {score: -10};
	} else if(checkWin(newBoard, aiPlayer)){
		return {score: 10};
	} else if(availSpot.length === 0){
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpot.length; i++) {
		var move = {};
		move.index = newBoard[availSpot[i]];
		newBoard[availSpot[i]] = player;
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
		newBoard[availSpot[i]] = move.index;
		moves.push(move);
	}
	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if(moves[i].score > bestScore){
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if(moves[i].score < bestScore){
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

function declareWinner(message){
	document.querySelector('.endGame .text').innerText = message;
	document.querySelector('.endGame').style.display = 'block';
	document.querySelector('.startGame').style.display = 'inline-block';

}
function checkTie(){
	if (emptySquares(origBoard).length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = 'green';
			cells[i].removeEventListener('click', turnClick, false);
		}
		setTimeout(() => declareWinner('Tie game!'), 500);
		return true;
	}
	return false;
}
function greeting(btn1, btn2, fixed){
	btn1.classList.add('big');
	btn2.classList.add('small');
	setTimeout(function(){
		fixed.classList.add('hide');
	}, 600);
	setTimeout(function(){
		fixed.style.display = 'none';
	}, 1600);

}
var buttonX = document.querySelector('.x');
var buttonO = document.querySelector('.o');
var fixed = document.querySelector('.fixed');


buttonX.addEventListener('click', function(){
	greeting(buttonX, buttonO, fixed);
});
buttonO.addEventListener('click', function(){
	greeting(buttonO, buttonX, fixed);
	huPlayer = 'O';
	aiPlayer = 'X';
});