var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
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
	origBoard = Array.from(Array(9).keys());
	for(var i=0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('color');
		cells[i].addEventListener('click', turnClick, false);
	}
}
function turnClick(){
	turn(this.id, huPlayer);
}
function turn(id, player){
	origBoard[id] = player;
	document.getElementById(id).innerText = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
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
		document.getElementById(winArr[i]).style.color =
			gameWon.player == huPlayer ? "blue" : "red";
	}

}