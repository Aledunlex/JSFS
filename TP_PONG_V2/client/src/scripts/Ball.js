import Mobile from './Mobile.js';
import Paddle from './Paddle.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.x + this.horizontalSpeed <= 0) {
      this.x = 0;
      super.stopMoving();
    }
    if (this.y + this.verticalSpeed <= 0 || this.y + this.height >= this.theGame.canvas.height) {
      this.verticalSpeed = - this.verticalSpeed;    // rebond en haut ou en bas
    }
    if (this.x + this.width >= this.theGame.canvas.width) {
      this.horizontalSpeed = - this.horizontalSpeed;    // rebond en gauche ou à droite
    }
    super.move();
  }

  checkForCollisionWith(paddle) {
    let b2x = paddle.x + paddle.width;
    let b2y = paddle.y + paddle.height;

    let p1x = Math.max(this.x, paddle.x + 2*paddle.width/3);
    let p1y = Math.max(this.y, paddle.y + 2*paddle.height/3);

    let p2x = Math.min(this.x + paddle.width, b2x);
    let p2y = Math.min(this.y + paddle.height, b2y);

    let collision = (p1x < p2x) && (p1y < p2y);
    if (collision)
      this.handleCollision(paddle);
    return collision;
  }

  handleCollision(paddle) {

    // ça fait des trucs mais c'est pas jojo

    const difference = Math.abs(this.center - paddle.center);
    // this.horizontalSpeed = - this.horizontalSpeed;
    console.log(difference);
    if (difference < 10) {
      console.log("centre proche");
      this.horizontalSpeed = - (this.horizontalSpeed - 1);
      this.verticalSpeed = - (this.verticalSpeed - 1);
    }
    else if (difference < 30) {
      console.log("centre ... moyen?");
      this.horizontalSpeed = - (this.horizontalSpeed - 2);
      this.verticalSpeed = - (this.verticalSpeed - 2);
    }
    else {
      console.log("centre éloigné");
      this.horizontalSpeed = - (this.horizontalSpeed - 3);
      this.verticalSpeed = - (this.verticalSpeed - 3);
    }

  }

}
