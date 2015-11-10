function Canvas() {
  this.step = 20;
  this.lineHeight = 0.5;

  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
}

Canvas.prototype.getCanvasWidth = function() {
  return this.canvas.width;
};

Canvas.prototype.getCanvasHeight = function() {
  return this.canvas.height;
};

Canvas.prototype.getStepCount = function() {
  return this.canvas.width/this.step;
};

Canvas.prototype.drawGrid = function() {
  clearGrid(this.canvas, this.context);
  drawSteps(this.context, this.lineHeight, this.step*1.5);
  this.context.restore();
};

Canvas.prototype.drawPoint = function(x, y) {
  this.context.beginPath();
  this.context.arc(x, y, this.step / 2, 0, 2 * Math.PI, false);
  this.context.fillStyle = 'green';
  this.context.fill();
  this.context.stroke();
};

function clearGrid (canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();  
}

function drawSteps(context, lineHeight, step) {
  drawXSteps(context, lineHeight, step);
  drawYSteps(context, lineHeight, step);
}

function drawXSteps(context, lineHeight, step) {
  for (var i = step + lineHeight; i < context.canvas.height; i += step) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
    context.closePath();
  }  
}

function drawYSteps(context, lineHeight, step) {
  for (var i = step + lineHeight; i < context.canvas.width; i += step) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
    context.closePath();
  }  
}
