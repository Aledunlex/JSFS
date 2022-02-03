import Mobile from './Mobile';
import MoveState from './MoveState';

import paddleImg from '../images/paddle.png';

export default class Paddle extends Mobile {

  constructor(x, y, src = paddleImg, horizontalSpeed = 0, verticalSpeed = 8) {
    super(x, y, src, horizontalSpeed, verticalSpeed);
    this.moving = MoveState.NONE;
  }

  getUp() {
    return this.moving === MoveState.UP;
  }

  getDown() {
    return this.moving === MoveState.DOWN;
  }

  moveUp() {
    this.verticalSpeed = -Math.abs(this.verticalSpeed);
    this.moving = MoveState.UP;
  }

  moveDown() {
    this.verticalSpeed = Math.abs(this.verticalSpeed);
    this.moving = MoveState.DOWN;
  }

  stopMoving() {
    this.moving = MoveState.NONE;
  }

  move(canvas) {
    if (this.getUp()) {
      this.y = Math.max(0, this.y + this.verticalSpeed);
    }
    if (this.getDown()) {
      this.y = Math.min(canvas.height - this.img.height, this.y + this.verticalSpeed);
    }
  }

}
