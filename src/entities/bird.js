class Bird extends Entity {
  constructor(params) {
    super(params);
    this._flapSpeed = params.flapSpeed;
    this._physicsEngine = params.physicsEngine;
    this.falling = true;
    this._rotation = params.rotation;
    this._degree = params.degree;
  }

  update(delta) {
    super.update(delta);

    this._physicsEngine.update(this, delta);

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.y + this.height >= this._game._backgroundBottom.y) {

      dieSound.play();
      this._game.gameOver();
    }
    
  }

  draw() {
    this._spriteSheet.then((sprites) => {
      this._drawEngine._context.save();
      this._drawEngine._context.translate(this.x, this.y);
      this._drawEngine.drawImage({
        spriteSheet: sprites,
        image: this._frames[this._frameIdx],
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      });
      this._drawEngine._context.restore();
    });
  }


  flap() {
    this.speed = -this._flapSpeed;
  }
}
