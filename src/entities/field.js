class Field extends Entity {
    constructor(params) {
      super(params)
      this._flapSpeed = params.flapSpeed
      this._physicsEngine = params.physicsEngine
      this.falling = true
    }

    update(value) {
		let speed = this.dx
		if (value > 0) {
			if (value%10 == 0) {
				speed++
			}	
		}
		if (this.state.current == this.state.game) {
			this.x = (this.x - speed)%(this.width/2);
		} else {
			speed = this.dx;
		}
	}
}
