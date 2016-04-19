//赢法数组
var wins = [];
//赢法的统计数组
var myWin = [];
var computerWin = [];
for(var i = 0; i < 15; i++){
	wins[i] = [];
	for(var j = 0; j < 15; j++){
		wins[i][j] = [];
	}
}

var count = 0;
for (var i = 0; i < 15; i++ ){         //横线
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
} 
for (var i = 0; i < 15; i++ ){			//竖线
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
} 
for (var i = 0; i < 11; i++ ){			//斜线
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
for (var i = 0; i < 11; i++ ){			//反斜线
	for(var j = 14; j > 3; j--){
		for(var k = 0; k < 5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

console.log(count);

for(var i = 0; i < count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}