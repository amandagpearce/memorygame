
var message = document.getElementById('message');
var gameboard = document.getElementById('gameboard');
var Sbutton = document.getElementById('start-button');


var gameplay = false;
var playLockout = false;
var tileImgs = [], tileArray = [], tileFlippedOver = [];
var isFlipped = -1;
var timer;

function startGame(){
	Sbutton.classList.add('hidden');
	message.innerHTML="Click on the tiles to find matching images.";
	if(!gameplay){
		gameplay = true;

		for (var x=1; x<9; x++){
			tileImgs.push('./imgs/'+x+'.jpg');
		}

		tileArray = tileImgs.concat(tileImgs); //duplicates img array into tile array
		shuffleTiles(tileArray);
		buildBoard();
		
	}
}


function shuffleTiles(array){
	
	for(var x=array.length-1; x>0; x--){
		var holder = Math.floor(Math.random()*(x+1));
		var itemValue = array[x];
		array[x] = array[holder];
		array[holder] = itemValue; 
	}

}

function buildBoard(){
	var html = "";
	
	for(var i=0; i<tileArray.length; i++){
		html += "<div class='tile'><img onclick='pickCard(this, "+i+")' id='card"+(i+1)+"' src='http://via.placeholder.com/250/20bdaf/20bdaf?text='/></div>";
	}
	gameboard.innerHTML = html;
	
}

function pickCard(element,index){
	//console.log(event.target);

	if(!playLockout && !isInarray(element.id,tileFlippedOver)){
		if(isFlipped>=0){
			playLockout = true;
			cardFlip(element,index);
			if(checkSrc(tileFlippedOver[tileFlippedOver.length-1]) == checkSrc(tileFlippedOver[tileFlippedOver.length-2])){
				message.innerHTML = "Its a match!"
				isFlipped = -1;
				playLockout = false;
				if(tileFlippedOver.length == tileArray.length){
					gameOver();
				}
			}
			else{
				message.innerHTML = "Not a match :c"
				timer = setInterval(hideCards, 1000);
			}
		}
		else{
			isFlipped=index;
			cardFlip(element,index);
		}
	} else {

	}
}

function cardFlip(element,index){
	element.src = tileArray[index];
	tileFlippedOver.push(element.id);
}

function hideCards(){
	for(var i=0; i<2; i++){
		var tileId = tileFlippedOver.pop();
		document.getElementById(tileId).src = 'http://via.placeholder.com/250/20bdaf/20bdaf?text=';
	}
	clearInterval(timer);
	isFlipped = -1;
	playLockout = false;
	message.innerHTML = "Keep trying!";
}

function checkSrc(a){
	return document.getElementById(a).src;
}

function isInarray(value,array){
	return array.indexOf(value) > -1;
}

function gameOver(){
	message.innerHTML = "Game over";
	Sbutton.classList.remove('hidden');
	gameplay = false;
	tileArray = [];
	tileFlippedOver = [];
	tileImgs = [];
	gameboard.innerHTML = "";
}