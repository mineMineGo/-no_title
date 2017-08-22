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
  if(noSpace(board)){
    return false;
  }
  //　随机一个位置
  
  var randX = Math.floor(Math.random()*4);
  var randY = Math.floor(Math.random()*4);
  
  //　产生位置之后判断是否此位置有数字
  while(true){
    if(board[randX][randY] === 0){
      break;
    }
    randX = Math.floor(Math.random()*4);
    randY = Math.floor(Math.random()*4);
  }
  
  
  //　随机一个数字
  var randNumber = Math.random() < 0.5 ? 2: 4;
  board[randX][randY] = randNumber;
  
  showNumberAnimation(randX, randY, randNumber);
  
  return true
}

function init() {
  for(var i=0;i<  4;i++){
    for(var j=0;j<4;j++){
      var gridCell = $('#grid_cell_'+i+"_"+j);
      gridCell.css({
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
      })
    }
  }
  
  for(var i=0;i<4;i++){
    board[i]= new Array();
    for (var j=0;j<4;j++){
      board[i][j] = 0;
    }
  }
  updateBoardView();
}

function updateBoardView() {
  $('.number_cell').remove();
  for (var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var html = '<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>';
      $('#grid_container').append(html);
      var $ele = $('#number_cell'+i+'_'+j);
      
      if(board[i][j] === 0){
        $ele.css({
          width: 0,
          height: 0,
          top: getPosTop(i,j)+50,
          left: getPosLeft(i,j)+50
        });
      } else {
        $ele.css({
          width: '100px',
          height: '100px',
          top: getPosTop(i,j),
          left: getPosLeft(i,j),
          backgroundColor: getNumberBackgroundColor(board[i][j]),
          color: getNumberColor(board[i][j])
        });
        $ele.text(board[i][j]);
      }
    }
  }
}

