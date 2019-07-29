'use strict';

var sketchpad = document.getElementById('sketchpad');

if (sketchpad.getContext) {
  var context = sketchpad.getContext('2d');
}

function draw(context, x, y, size) {
  var r = 0;
  var g = 0;
  var b = 0;
  var a = 255;

  context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a / 255 + ')';
  context.beginPath();
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

var mouseX = 0;
var mouseY = 0;
var mouseClicked = 0;

function mouseDown() {
  mouseClicked = 1;
  draw(context, mouseX, mouseY, 10);
}

function mouseUp() {
  mouseClicked = 0;
}

function mouseMoves(e) {
  getMousePosition(e);
  if (mouseClicked == 1) {
    draw(context, mouseX, mouseY, 10);
  }
}

function getMousePosition(e) {
  if (!e) {
    var e = event;
  }
  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

function clearSketchpad(sketchpad, context) {
  context.clearRect(0, 0, sketchpad.width, sketchpad.height);
}

function saveSketchpad() {
  localStorage.setItem('sketch1', sketchpad.toDataURL());
}

function loadSketchpad() {
  var dataURL = localStorage.getItem('sketch1');
  var img = new Image();
  img.src = dataURL;
  context.drawImage(img, 0, 0);
}

var loadButton = document.getElementById('load');
var saveButton = document.getElementById('save');
var clearButton = document.getElementById('clear');
loadButton.addEventListener('click', loadSketchpad);
saveButton.addEventListener('click', saveSketchpad);
clearButton.addEventListener('click', function() {
  clearSketchpad(sketchpad, context);
});

sketchpad.addEventListener('mousedown', mouseDown, false);
sketchpad.addEventListener('mousemove', mouseMoves, false);
window.addEventListener('mouseup', mouseUp, false);
