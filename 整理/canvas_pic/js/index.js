/**
 * Created by gaoyuan on 17-8-11.
 */
var canvasWidth = 800;
var canvasHeight = 450;
var radius = 50;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d')

canvas.height = canvasHeight;
canvas.width = canvasWidth


var image = new Image()
var clippingRegion = {
  x: 400,
  y: 200,
  r: 50
}
image.src = $('#image').attr('src')
image.onload = function () {
   initCanvas()
}

function initCanvas() {
  clippingRegion = {
    x: Math.random()*(canvasWidth - 2*radius)+radius,
    y: Math.random()*(canvasHeight- 2*radius)+radius,
    r: radius
  }
  draw(image,clippingRegion)
}
function draw(image, clipArea) {
  context.clearRect(0,0,canvasWidth,canvasHeight);
  context.save();
  
  setClippingaArea(clipArea);
  context.drawImage(image,0,0,image.naturalWidth,image.naturalHeight,0,0,canvasWidth,canvasHeight);
  context.restore();
}
function setClippingaArea(area) {
  context.beginPath();
  
  //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
  //圆心ｘ坐标，y坐标，半径，起始角度，结束角度，逆时针false还是顺时针true
  context.arc(area.x,area.y,area.r,0,Math.PI*2,false);
  context.clip()
}


function show() {
  var timeAnimation =setInterval(function () {
    clippingRegion.r += 20
    if(clippingRegion.r > 2*Math.max(canvasHeight,canvasWidth)){
      clearInterval(timeAnimation)
    }
    draw(image,clippingRegion)
  },30)
}

function reset() {
  initCanvas();
}
