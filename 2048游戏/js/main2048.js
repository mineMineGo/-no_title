/**
 * Created by gaoyuan on 17-8-22.
 */
var board = new Array();
var score = 0;
$(document).ready(function () {
    newGame()
});

function newGame() {
    // 初始化棋盘格
    init();
    //随机在两个格子中产生数字
    generateOneNumber();
    generateOneNumber();
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //　随机一个位置
    
    var randX = Math.floor(Math.random() * 4);
    var randY = Math.floor(Math.random() * 4);
    
    //　产生位置之后判断是否此位置有数字
    while (true) {
        if (board[randX][randY] === 0) {
            break;
        }
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
    }
    
    
    //　随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randX][randY] = randNumber;
    
    showNumberAnimation(randX, randY, randNumber);
    
    return true
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid_cell_' + i + "_" + j);
            gridCell.css({
                top: getPosTop(i, j),
                left: getPosLeft(i, j)
            })
        }
    }
    
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $('.number_cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var html = '<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>';
            $('#grid_container').append(html);
            var $ele = $('#number_cell_' + i + '_' + j);
            if (board[i][j] === 0) {
                $ele.css({
                    width: 0,
                    height: 0,
                    top: getPosTop(i, j) + 50,
                    left: getPosLeft(i, j) + 50
                });
            } else {
                $ele.css({
                    width: '100px',
                    height: '100px',
                    top: getPosTop(i, j),
                    left: getPosLeft(i, j),
                    backgroundColor: getNumberBackgroundColor(board[i][j]),
                    color: getNumberColor(board[i][j])
                });
                $ele.html(board[i][j]);
            }
        }
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:
            // left
            //
            if (moveLeft()) {
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 38:
            // up
            if (moveUp()) {
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            // right
            break;
        case 40:
            if (moveDown()) {
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            // down
            break;
        default:
            // default
            break;
    }
});

function isGameOver() {
    if(noSpace(board) && noMove(board)){
        gameOver();
    }
}
function gameOver() {
    alert("GAME OVER");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false
    }
    // moveLeft逻辑
    // 对每一个数字左侧位置进行判断，看是否可以为落脚点
    // 落脚位置是否为空
    //　落脚位置数字和待判定元素数字是否相等
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                // 左移动时候从最左边开始循环
                for (var k = 0; k < j; k++) {
                    // 从ｋ列到ｊ列
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        // 从i,j移动到i,k坐标
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    //更新玩数据board后要用到刷新功能
    return true;
}

function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }
    // 右移动方法
    for(var i=0;i<4;i++){
        for (var j=2;j>=0;j--){
            if(board[i][j]!==0){
                // 当前列是j
                //　右移动循环时候从最右边开始
                for (var k=3;k>j;k--){
                    // 循环ｊ列右边的列
                    if(board[i][k] === 0　&& noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if　(board[i][k] === board[i][j] && noBlockHorizontal(i,j,k,board)) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
    
                        score += board[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}

function moveUp() {
    if(!canMoveUp(board)){
        return false;
    }
    for (var i=3;i>=1;i--){
        for(var j=0;j<4;j++){
            if (board[i][j]!==0) {
                for(var k=0;k<i;k++){
                    if(board[k][j] ===0 && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else  if(board[k][j] === board[i][j] && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
    
                        score += board[k][j];
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()',200);
    return true
}

function moveDown() {
    if(!canMoveDown(board)){
        return false
    }
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j] !== 0){
                for(var k=3;k>i;k--){
                    if(board[k][j] === 0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] === board[i][j] && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
    
                        score += board[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true
}