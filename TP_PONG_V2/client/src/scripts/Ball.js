import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  static BALL_WIDTH = 24;

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.w = this.theGame.canvas.width;
    this.h = this.theGame.canvas.height;
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.x + this.shiftX < 0 || this.x + this.shiftX >= this.w - Ball.BALL_WIDTH) {
      this.shiftX = - this.shiftX;
    }
    if (this.y + this.shiftY < 0 || this.y + this.shiftY >= this.h - Ball.BALL_WIDTH) {
      this.shiftY = - this.shiftY;
    }
    this.x += this.shiftX;
    this.y += this.shiftY;
  }

  collisionWith(obstacle) {
    let b2x = obstacle.x + obstacle.w;
    let b2y = obstacle.y + obstacle.h;

    let p1x = Math.max(this.x, obstacle.x);
    let p1y = Math.max(this.y, obstacle.y);

    let p2x = Math.min(this.x + Ball.BALL_WIDTH, b2x);
    let p2y = Math.min(this.y + Ball.BALL_WIDTH, b2y);

    return ((p1x < p2x) && (p1y < p2y));
  }

}
