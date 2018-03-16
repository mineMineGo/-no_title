/**
 * Created by gaoyuan on 17-8-22.
 */


function getPosTop(x, y) {
    return 20 + x * 120
}

function getPosLeft(x, y) {
    return 20 + y * 120
}

//　获得不同数字的背景色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return '#eee4da';
            break;
        case 4:
            return '#ede0c8';
            break;
        case 8:
            return '#f2b179';
            break;
        case 16:
            return '#f59563';
            break;
        case 32:
            return '#f67c5f';
            break;
        case 64:
            return '#f65e3b';
            break;
        case 128:
            return '#edcf72';
            break;
        case 256:
            return '#edcc61';
            break;
        case 512:
            return '#9c0';
            break;
        case 1024:
            return '#33b5e5';
            break;
        case 2048:
            return '#09c';
            break;
        case 4096:
            return '#a6c';
            break;
        case 3192:
            return '#93c';
            break;
    }
    
    return 'black'
}


function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}

function noSpace(arr) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] === 0) {
                //　说明还有空间
                return false
            }
        }
    }
    return true
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (Number(board[i][j]) !== 0) {
                // 如果左边的那格没有数字
                // 或者左边数字和右边数字一致时候
                //　都是可以向左移动的
                if (Number(board[i][j - 1]) === 0 || (board[i][j - 1] === board[i][j])) {
                    return true
                }
            }
        }
    }
    return false
}

function canMoveRight(board) {
    for(var i=0;i<4;i++){
        // 从第三列开始循环
        for(var j=2;j>=0;j--){
            if(Number(board[i][j]) !==0){
                if(Number(board[i][j+1]) === 0 || (board[i][j] === board[i][j+1])){
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i=3;i>=1;i--){
        for (var j=0;j<4;j++) {
            if(board[i][j]!==0){
                if(board[i-1][j]===0 || board[i][j] === board[i-1][j]){
                    return true
                }
            }
        }
    }
    return false
}

function canMoveDown(board) {
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j] !== 0 ){
                if(board[i+1][j] === 0 || board[i][j] === board[i+1][j]){
                    return true
                }
            }
        }
    }
    return false;
}

// i表示第几行，j表示当前格，k表示前面的当前格子,k是小于j的
function noBlockHorizontal(i, k, j, board) {
    for (var m = k + 1; m < j; m++) {
        if (board[i][m] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,startRow,endRow,board) {
    for (var m = startRow+1;m<endRow;m++){
        if(board[m][col] !== 0){
            return false
        }
    }
    return true
}

function noMove(board) {
    if(canMoveDown(board) || canMoveLeft(board) ||
        canMoveRight(board) || canMoveUp(board)){
        return false
    }
    return true
}

function updateScore(score) {
    document.getElementById('score').innerText = score;
}