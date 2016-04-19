var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true;
var over = null;
var chessBoard = [];
context.strokeStyle = '#bfbfbf';
for(var i = 0; i < 15; i++){  //使点击棋子不会改变颜色
	chessBoard[i] = [];
	for(var j = 0; j < 15; j++){
		chessBoard[i][j] = 0;
	}
}

//水印
var logo = new Image();
logo.src = 'image/logo2.jpg';
logo.onload = function(){
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}
//绘制棋盘
var drawChessBoard = function(){ 

	for(var i = 0;  i < 15; i++){
		context.moveTo(15 + i*30, 15);  //竖线
		context.lineTo(15 + i*30, 435);
		context.stroke();
		context.moveTo(15, 15 + i*30);  //横线
		context.lineTo(435, 15 + i*30);
		context.stroke();
	}
}
var oneStep = function(i, j, me){ //绘制棋子
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);
	if(me){
		gradient.addColorStop(0, '#0a0a0a');
		gradient.addColorStop(1, '#636766');		
	}else{
		gradient.addColorStop(0, '#d1d1d1');
		gradient.addColorStop(1, '#f9f9f9');
	}

	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	// console.log(y);
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i, j, me);
		chessBoard[i][j] = 1;
		
		for(var k = 0; k < count; k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6; //不可能赢
				if(myWin[k] == 5){
					window.alert('you win!');
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}
}

var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;  //最高分点的坐标
	for(var i = 0; i < 15; i++){ //初始化数组
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0; j < 15; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i = 0; i < 15; i++){
		for (var j =0; j < 15; j++){ //遍历整个棋盘
			if(chessBoard[i][j] == 0){  //等于零表示空闲
				for(var k = 0; k < count; k++){
					if(wins[i][j][k]){  //第k种赢法
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2400;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}	
			}
		}
	}
	oneStep(u, v, false);  //AI落子的位置
	chessBoard[u][v] = 2;   //AI在 u，i处已落子
	for(var k = 0; k < count; k++){
			if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k] = 6; //不可能赢
				if(computerWin[k] == 5){
					window.alert('you lose!');
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
		}
}

