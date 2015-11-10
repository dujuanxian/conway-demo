function PointMap(canvas) {
	this.points = [];
	this.canvas = canvas;
	this.stepCount = this.canvas.getStepCount();
	this.canvasWidth = this.canvas.getCanvasWidth();
	this.canvasHeight = this.canvas.getCanvasHeight();
}

PointMap.prototype.getPoints = function() {
	return this.points;
};

PointMap.prototype.updatePointsStatus = function() {
	var newPoints = [];
	var points = this.points;
	for(var i=0; i<this.canvasWidth; i=i+this.stepCount) {
		for(var j=0; j<this.canvasHeight; j=j+this.stepCount) {
			var aroundPoints = getAroundPoints(i, j, this.stepCount, this.canvasWidth, this.canvasHeight);
			if (isLivePoint(aroundPoints, points)) {
				newPoints.push({x: i, y:j})
			}
		}
	}
	this.points = newPoints;
};

PointMap.prototype.createRandomPoints = function() {
	for(var i=0; i<this.canvasWidth; i=i+this.stepCount) {
		for(var j=0; j<this.canvasHeight; j=j+this.stepCount) {
			if (Math.random() < 0.1) {
				//Only save live point
				var point = {x: i, y: j};
				this.points.push(point);
			}
		}
	}
};

function getAroundPoints(xValue, yValue, stepCount, canvasWidth, canvasHeight) {
	var x = getBoundaryPointValue(xValue, canvasWidth, stepCount);
	var y = getBoundaryPointValue(yValue, canvasHeight, stepCount);
	return [
		{x: x-stepCount, y: y-stepCount},
		{x: x-stepCount, y: y},
		{x: x-stepCount, y: y+stepCount},
		{x: x, y: y+stepCount},
		{x: x, y: y+stepCount},
		{x: x+stepCount, y: y-stepCount},
		{x: x+stepCount, y: y},
		{x: x+stepCount, y: y+stepCount}
	];
}

function getBoundaryPointValue(value, boundary, stepCount) {
	var result = value;
	if (value <= 0) {
		result = boundary + stepCount;
	} else if(value >= boundary) {
		result = stepCount;
	}
	return result;
}

function isLivePoint(aroundPoints, points) {
	var livePointCount = getAroundLivePointCount(aroundPoints, points);
	return livePointCount >= 2 && livePointCount <= 3
}

function getAroundLivePointCount(aroundPoints, points) {
	var livePointCount = 0;
	for(var i=0; i<aroundPoints.length; i++) {
		for(var j=0; j<points.length; j++) {
			if(points[j].x === aroundPoints[i].x && points[j].y === aroundPoints[i].y) {
				livePointCount += 1;
			}
		}
	}
	return livePointCount;
}
