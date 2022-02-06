import Ball from './Ball.js';
import Paddle from './Paddle.js'
import MoveState from './MoveState';

const DISTANCE_FROM_BORDER = 30;

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas.width/2, (this.canvas.height - Ball.BALLHEIGHT)/2, this);
    this.paddleG = new Paddle(
      DISTANCE_FROM_BORDER,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );
    this.paddleD = new Paddle(
      this.canvas.width - DISTANCE_FROM_BORDER * 2,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );
    this.state = this.onGoing();
  }

  static get DISTANCE_FROM_BORDER() {return DISTANCE_FROM_BORDER;}

  /** start this game animation */
  start() {
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));

    this.handleEndOfRound();
  }

  handleEndOfRound() {
    if (!this.onGoing()) {
      const winningPaddle = this.determineWinner();
      //attribuer un point au gagnant?
    }
  }

  onGoing() {
    return !this.ball.getStop();
  }

  /** move then draw the bouncing ball */
  moveAndDraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const paddles = [this.paddleG, this.paddleD];
    // draw the paddle
    paddles.forEach(paddle => paddle.draw(this.context));

    // draw and move the ball
    this.ball.draw(this.context);
    this.ball.move();    
    paddles.forEach(paddle => this.ball.checkForCollisionWith(paddle));

    // move the paddles
    paddles.forEach(paddle => paddle.move());
  }

  determineWinner() {
    return this.ball.x == 0 ? this.paddleD : this.paddleG;
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case " ":
        if (!this.onGoing()) {
          this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
        }
        break;
      case "ArrowUp":
        this.paddleD.moveUp();
        break;
      case "ArrowDown":
        this.paddleD.moveDown();
        break;
      case "z":
        this.paddleG.moveUp();
        break;
      case "s":
        this.paddleG.moveDown();
        break;
     default: return;
   }
   event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
        if (!this.paddleD.getDown()) {
          this.paddleD.stopMoving();
        }
        break;
      case "ArrowDown":
        if (!this.paddleD.getUp()) {
          this.paddleD.stopMoving();
        }
        break;
      case "z":
        if (!this.paddleG.getDown()) {
          this.paddleG.stopMoving();
        }
        break;
      case "s":
        if (!this.paddleG.getUp()) {
          this.paddleG.stopMoving();
        }
        break;  
     default: return;
   }
   event.preventDefault();
  }

}
