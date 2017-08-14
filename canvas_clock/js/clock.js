/**
 * Created by gaoyuan on 17-8-14.
 */
(function () {
  var myCanvas = document.getElementById('clock');
  var ctx = myCanvas.getContext('2d');
  var canvasWidth = ctx.canvas.width
  var canvasHeight = ctx.canvas.height;
  
  var scale = canvasWidth / 200;
  
  var r = canvasWidth / 2 ;
  function drawBackground() {
    
    ctx.save();
    ctx.translate(r,r);
    ctx.beginPath();
  
    ctx.lineWidth =　10 * scale;
    
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
    
    var hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * scale + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //时辰
    hourNumber.forEach(function (number, i) {
      var rad = 2 * Math.PI / 12 *i;
      var x = Math.cos(rad) * (r - 30 * scale);
      var y = Math.sin(rad) * (r - 30 * scale);
      
      ctx.fillText(number,x,y)
    })
    //60个小点
    for (var i=0;i<60;i++){
      var rad = 2*Math.PI/60*i;
      var x = Math.cos(rad)*(r - 18 * scale);
      var y = Math.sin(rad)*(r - 18 * scale);
      ctx.beginPath();
      if(i % 5 === 0){
        ctx.fillStyle = '#000';
      }else{
        ctx.fillStyle = '#ccc';
      }
      ctx.arc(x, y, 2 * scale, 0, 2 * Math.PI, false);
      ctx.fill();
    }
    
  }
  function drawHours(hour,minute) {
    ctx.save();
    ctx.beginPath();
  
    var rad = 2*Math.PI/12*hour;
    var minRad = 2 * Math.PI / 12 / 60 *minute;
    ctx.rotate(rad + minRad);
  
    ctx.moveTo(0,10);
    ctx.lineWidth = 6 * scale;
    ctx.lineCap = 'round';
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    ctx.restore();
  }
  
  function drawMinute(minutes) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minutes;
    ctx.rotate(rad);
    
    ctx.moveTo(0,15);
    ctx.lineWidth = 3 * scale;
    ctx.lineCap = 'round';
    ctx.lineTo(0,-r/2 - 5*scale)
    ctx.stroke();
    ctx.restore();
  }
  
  function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.fillStyle = 'red';
    ctx.moveTo(-2,20);
    ctx.lineTo(2,20);
    ctx.lineTo(1,-r + 15)
    ctx.lineTo(-1,-r + 15)
    ctx.fill()
    
    ctx.restore();
  }
  
  function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(0,0,3*scale,2*Math.PI,false)
    ctx.fill()
  }
  
  function draw() {
    
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    console.log(hour,minute,second)
    
    
    drawBackground();
    //画时针
    drawHours(hour,minute);
  
    // 画分针
    drawMinute(minute);
  
    //　画秒针
    drawSecond(second);
  
    //画圆心
    drawDot();
    
    ctx.restore();
  }
  draw();
  setInterval(function () {
    draw();
  },1000)
})();