var board;
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
	board = Array.from(Array(9).keys());
	for(var i=0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}
function turnClick(){
	turn(this.id, huPlayer);
}
function turn(id, player){
	board[id] = player;
	document.getElementById(id).innerText = player;
	//console.log(board);
}