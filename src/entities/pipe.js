class Pipe extends Entity {
  constructor(params) {
    super(params);
    this._index = 0;
    this._speedGame = params.speedGame;
    this._pipeGap = this.height + params.pipeGap;
    this._pipes = params.pipes;
    this._pipeMin = params.pipeMin;
    this._pipeMax = params.pipeMax;
    this._pipeNext = params.pipeNext;
    this._pipes[0] = {
      x: this._game.width,
      y: this.getPositionY(),
    };
    this._scoreX = params.scoreX;
  }

  update(delta) {
    this._index = Math.ceil(delta) + this._speedGame + 2;
  }

  getPositionY(min, max) {
    min = Math.ceil(this._pipeMin);
    max = Math.floor(this._pipeMax);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw() {
    for (let i = 0; i < this._pipes.length; i++) {
      this._spriteSheet.then((sprites) => {
        this._drawEngine.drawImage({
          spriteSheet: sprites,
          image: this._frames[0],
          x: this._pipes[i].x,
          y: this._pipes[i].y,
          width: this.width,
          height: this.height,
        });
        this._drawEngine.drawImage({
          spriteSheet: sprites,
          image: this._frames[1],
          x: this._pipes[i].x,
          y: this._pipes[i].y - this._pipeGap,
          width: this.width,
          height: this.height,
        });
      });
      this._pipes[i].x -= this._index;
      if (this._index == 5) this._pipeNext = 210;
      if (this._index == 6 || this._index == 7) {
        this._pipeNext = 210;
        this._scoreX = 42;
      }

      if (this._pipes[i].x == this._pipeNext) {
        this._pipes.push({
          x: this._game.width,
          y: this.getPositionY(),
        });
      }

      if (this._pipes[i].x == this._scoreX) {
        this._game._config.score++;
        pointSound.play();
        pointSound.currentTime = 0;
      }
      if (this._pipes.length > 2) this._pipes.shift();

      const birdXright =
        this._game._config.bird.x + this._game._config.bird.width;
      const pipeXleft = this._pipes[i].x;

      const birdXleft = this._game._config.bird.x;
      const pipeXright = this._pipes[i].x + this.width;

      const birdYtop = this._game._bird.y;
      const pipeYtop = this._pipes[i].y - this._pipeGap + this.height;

      const birdYbottom = this._game._bird.y + this._game._config.bird.height;
      const pipeYbottom = this._pipes[i].y;

      if (
        birdXright >= pipeXleft &&
        birdXleft <= pipeXright &&
        (birdYtop <= pipeYtop || birdYbottom >= pipeYbottom)
      ) {
        hitSound.play();
        hitSound.currentTime = 0;
        setTimeout(() => {
          continueSound.volume = 0.5;
          continueSound.play();
          continueSound.currentTime = 0;
        }, 300);

        this._game.gameOver();
      }
    }
  }
}
