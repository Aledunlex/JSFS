import Mobile from './Mobile';
import MoveState from './MoveState';

import paddleImg from '../images/paddle.png';

export default class Paddle extends Mobile {

  constructor(x, y, src = paddleImg, shiftX = 0, shiftY = 8) {
    super(x, y, src, shiftX, shiftY);
    this.moving = MoveState.NONE;
  }

  getUp() {
    return this.moving === MoveState.UP;
  }

  getDown() {
    return this.moving === MoveState.DOWN;
  }

  moveUp() {
    this.shiftY = -Math.abs(this.shiftY);
    this.moving = MoveState.UP;
  }

  moveDown() {
    this.shiftY = Math.abs(this.shiftY);
    this.moving = MoveState.DOWN;
  }

  stopMovingPaddle() {
    this.moving = MoveState.NONE;
  }

  move(canvas) {
    if (this.getUp()) {
      this.y = Math.max(0, this.y + this.shiftY);
    }
    if (this.getDown()) {
      this.y = Math.min(canvas.height - this.img.height, this.y + this.shiftY);
    }
  }

}
