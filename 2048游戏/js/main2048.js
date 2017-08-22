/**
 * Created by gaoyuan on 17-8-22.
 */
$(document).ready(function () {
  newGame()
});

function newGame() {
  // 初始化棋盘格
  //随机在两个格子中产生数字
  init();
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
}

