import Mobile from './Mobile';

import paddleImg from '../images/paddle.png';

export default class Paddle extends Mobile {

  /**  build a paddle
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this paddle belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, paddleImg, 0, 2);
    this.theGame = theGame;
  }

  moveUp() {
    this.shiftY = -Math.abs(this.shiftY);
  }

  moveDown() {
    this.shiftY = Math.abs(this.shiftY);
  }

  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.y = Math.max(0, this.y + this.shiftY);
    }
    super.move();
  }

}
