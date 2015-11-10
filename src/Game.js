function Game() {
	this.canvas = new Canvas();
	this.canvas.drawGrid();	
	this.pointMap = new PointMap(this.canvas);
}

Game.prototype.start = function() {
	var self = this;

	this.pointMap.createRandomPoints();
	this.drawPoints();

	setInterval(function(){
		self.canvas.drawGrid();
		self.pointMap.updatePointsStatus();
		self.drawPoints();
	}, 1200);
};

Game.prototype.drawPoints = function() {
	var points = this.pointMap.getPoints();
	for (var i=0; i < points.length; i++) {
		var point = points[i];
		this.canvas.drawPoint(point.x, point.y);	
	}
};


