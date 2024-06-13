class Game {
    constructor() {
      this._config = new Config();
  
      this._canvasListener = null;
  
      this._canvas = document.getElementById(this._config.canvas.id);
      this._canvas.width = this._config.canvas.width;
      this._canvas.height = this._config.canvas.height;
  
      this.width = this._config.canvas.width;
      this.height = this._config.canvas.height;
  
      this._drawEngine = new CanvasDrawEngine({
        canvas: this._canvas,
        game: this,
      });
  
      this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity });
  
      this._resourceLoader = new ResourceLoader();

      let rect = this._canvas.getBoundingClientRect();

      this._inputHandler = new MouseInputHandler({
        left: (event) => {
          this._bird.flap();
          if (this._playing) flapSound.play();
          flapSound.currentTime = 0;

          let clickX = event.clientX - rect.left;
          let clickY = event.clientY - rect.top;
          if (
            clickX >= this._config.restartBtn.x &&
            clickX <= this._config.restartBtn.x + this._config.restartBtn.width &&
            clickY >= this._config.restartBtn.y &&
            clickY <= this._config.restartBtn.y + this._config.restartBtn.height
          ) {
            location.reload();
          }
        },
      });

      this._inputHandlerKey = new KeyboardInputHandler({
        ArrowUp: () => {
          this._bird.flap();
          if (this._playing) flapSound.play();
          flapSound.currentTime = 0;
        },
        Space: () => {
          this._bird.flap();
          if (this._playing) flapSound.play();
          flapSound.currentTime = 0;
        },
        KeyW: () => {
          this._bird.flap();
          if (this._playing) flapSound.play();
          flapSound.currentTime = 0;
        },
        KeyC: () => {
          localStorage.clear();
        },
        KeyR: () => {
          location.reload();
        },
      });
    }
  
    async prepare() {
      this._spriteSheet = this._resourceLoader.load({
        type: RESOURSE_TYPE.IMAGE,
        src: this._config.spritesheet.src,
        width: this._config.spritesheet.width,
        height: this._config.spritesheet.height,
      });
    }

    reset() {
      this._backgroundBottom = new BackgroundBottom({
        x: this._config.backgroundBottom.x,
        y: this._config.backgroundBottom.y,
        width: this._config.backgroundBottom.width,
        height: this._config.backgroundBottom.height,
        frames: this._config.backgroundBottom.frames,
        spriteSheet: this._spriteSheet,
        speedGame: this._config.speedGame,
        drawEngine: this._drawEngine,
        game: this,
      });
  
      this._gameOverBG = new GameOverBG({
        x: this._config.gameOverBG.x,
        y: this._config.gameOverBG.y,
        width: this._config.gameOverBG.width,
        height: this._config.gameOverBG.height,
        frames: this._config.gameOverBG.frames,
        spriteSheet: this._spriteSheet,
        drawEngine: this._drawEngine,
        game: this,
      });
  
      this._restartBtn = new RestartBtn({
        x: this._config.restartBtn.x,
        y: this._config.restartBtn.y,
        width: this._config.restartBtn.width,
        height: this._config.restartBtn.height,
        frames: this._config.restartBtn.frames,
        spriteSheet: this._spriteSheet,
        drawEngine: this._drawEngine,
        game: this,
      });
  
      this._bird = new Bird({
        x: this._config.bird.x,
        y: this._config.bird.y,
        width: this._config.bird.width,
        height: this._config.bird.height,
        frames: this._config.bird.frames,
        spriteSheet: this._spriteSheet,
        sound: this._sounds,
        flapSpeed: this._config.bird.flapSpeed,
        physicsEngine: this._physicsEngine,
        drawEngine: this._drawEngine,
        rotation: this._config.rotation,
        degree: this._config.degree,
        game: this,
      });
  
      this._pipe = new Pipe({
        x: this._config.pipe.x,
        y: this._config.pipe.y,
        width: this._config.pipe.width,
        height: this._config.pipe.height,
        frames: this._config.pipe.frames,
        spriteSheet: this._spriteSheet,
        speedGame: this._config.speedGame,
        drawEngine: this._drawEngine,
        pipeGap: this._config.pipeGap,
        pipes: this._config.pipe.pipes,
        pipeMin: this._config.pipeMin,
        pipeMax: this._config.pipeMax,
        pipeNext: this._config.pipeNext,
        scoreX: this._config.scoreX,
        pointSound: this.pointSound,
        game: this,
      });
  
      this._getReadyBG = new GetReadyBG({
        x: this._config.getReadyBG.x,
        y: this._config.getReadyBG.y,
        width: this._config.getReadyBG.width,
        height: this._config.getReadyBG.height,
        frames: this._config.getReadyBG.frames,
        spriteSheet: this._spriteSheet,
        drawEngine: this._drawEngine,
        game: this,
      });
  
      this._scoreOnScreen = new ScoreOnScreen({
        x: this._config.scoreOnScreen.x,
        y: this._config.scoreOnScreen.y,
        width: this._config.scoreOnScreen.width,
        height: this._config.scoreOnScreen.height,
        frames: this._config.scoreOnScreen.frames,
        spriteSheet: this._spriteSheet,
        drawEngine: this._drawEngine,
        game: this,
      });
    }
  
    initReset() {
      this._background = new Background({
        x: this._config.background.x,
        y: this._config.background.y,
        width: this._config.background.width,
        height: this._config.background.height,
        frames: this._config.background.frames,
        spriteSheet: this._spriteSheet,
        speedGame: this._config.speedGame,
        drawEngine: this._drawEngine,
        game: this,
      });
  
      this._getReadyBG = new GetReadyBG({
        x: this._config.getReadyBG.x,
        y: this._config.getReadyBG.y,
        width: this._config.getReadyBG.width,
        height: this._config.getReadyBG.height,
        frames: this._config.getReadyBG.frames,
        spriteSheet: this._spriteSheet,
        drawEngine: this._drawEngine,
        game: this,
      });
    }
  
    update(delta) {
      this._background.update(delta);
      this._backgroundBottom.update(delta);
      this._pipe.update(delta);
      this._bird.update(delta);
    }
  
    draw() {
      this._background.draw();
      this._backgroundBottom.draw();
      this._pipe.draw();
      this._bird.draw();
      if (!this._config.myRecord == 0) this._scoreOnScreen.draw();
    }
    
    _loop() {
      const now = Date.now();
      const delta = now - this._lastUpdate;
  
      this.update(delta / 1000);
  
      if (this._playing) {
        this._drawEngine.clear();
        this.draw();
        this._lastUpdate = now;
  
        requestAnimationFrame(this._loop.bind(this));
      }
    }
  
    start() {
      this._canvas.removeEventListener("click", this._canvasListener);
      this._canvas.removeEventListener("keydown", this._canvasListener);
      this._playing = true;
      this._inputHandler.subscribe();
      this._inputHandlerKey.subscribe();
      this._lastUpdate = Date.now();
      this.reset();
      setTimeout(() => {
        this._loop();
      }, 10);
    }
  
    gameOver() {
      setTimeout(() => {
        this._drawEngine.clear();
        this._background.draw();
        this._gameOverBG.draw();
        this._restartBtn.draw();
  
        if (this._config.score >= this._config.myRecord) {
          localStorage.setItem("myRecord", this._config.score);
        } else {
          localStorage.setItem("myRecord", this._config.myRecord);
        }
        this._playing = false;
      }, 10);
    }
  
    initGame() {
      document.addEventListener("keydown", function (event) {
        if (event.code == "KeyC") {
          localStorage.clear();
          console.log("Best clear");
        }
      });
      this.initReset();
      document.addEventListener("DOMContentLoaded", () => {
        this._config.myRecord = localStorage.getItem("myRecord");
      });
      this._background.draw();
      this._getReadyBG.draw();
  
      this._canvasListener = () => {
        this.start();
      };
      this._canvas.addEventListener("click", this._canvasListener);
    }
  }
