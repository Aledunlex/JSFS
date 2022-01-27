import Ball from './Ball.js';
import Paddle from './Paddle.js'

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
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(20, this.canvas.height/2, this)
  }

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
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.draw(ctxt);
    this.paddle.draw(ctxt);
    this.paddle.move();
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
        this.paddle.moveUp();
        break;
      case "ArrowDown":
      case "Down":
        this.paddle.moveDown();
        break;
     default: return;
   }
   event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
        if (!this.paddle.moveDown()) {this.paddle.stopMoving();}
        break;
      case "ArrowDown":
      case "Down":
        if (!this.paddle.moveUp()) {this.paddle.stopMoving();}
        break;
     default: return;
   }
   event.preventDefault();
  }


}
