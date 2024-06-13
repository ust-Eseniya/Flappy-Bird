class Background extends Entity {
	constructor(params) {
	  super(params);
	  this._index = 0;
	  this._speedGame = params.speedGame;
	}
  
	update(delta) {
	  this._index += 2.5 * Math.ceil(delta);
	  this.x = -((this._index * (this._speedGame / 2)) % this.width);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[this._frameIdx],
		  x: this.x + this.width,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[this._frameIdx],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
	  });
	}
  }
  
  // земля
  class BackgroundBottom extends Entity {
	constructor(params) {
	  super(params);
	  this._index = 0;
	  this._speedGame = params.speedGame;
	}
  
	update(delta) {
	  this._index += 5 * Math.ceil(delta);
	  this.x = -((this._index * (this._speedGame / 2)) % this.width);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[this._frameIdx],
		  x: this.x + this.width,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[this._frameIdx],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
	  });
	}
  }
  
  // экран GetReady
  class GetReadyBG extends Entity {
	constructor(params) {
	  super(params);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[0],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
	  });
	}
  }
  
  
  // экран GameOver
  class GameOverBG extends Entity {
	constructor(params) {
	  super(params);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[0],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
  
		this._drawEngine.drawText({
		  x: 310,
		  y: 170,
		  text: this._game._config.score,
		});
		this._drawEngine.drawText({
		  x: 305,
		  y: 225,
		  text: this._game._config.myRecord,
		});
	  });
	}
  }
  
  
  // плашка с текущим счетом и рекордом
  class ScoreOnScreen extends Entity {
	constructor(params) {
	  super(params);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[0],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
		this._drawEngine.drawText({
		  x: 425,
		  y: 413,
		  text: this._game._config.score,
		});
		this._drawEngine.drawText({
		  x: 425,
		  y: 445,
		  text: this._game._config.myRecord,
		});
	  });
	}
  }
  
  // кнопка Restart
  class RestartBtn extends Entity {
	constructor(params) {
	  super(params);
	}
  
	draw() {
	  this._spriteSheet.then((sprites) => {
		this._drawEngine.drawImage({
		  spriteSheet: sprites,
		  image: this._frames[0],
		  x: this.x,
		  y: this.y,
		  width: this.width,
		  height: this.height,
		});
	  });
	}
  }
