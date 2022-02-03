import Ball from './Ball.js';
import Paddle from './Paddle.js'

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
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, this);
    this.paddleG = new Paddle(
      DISTANCE_FROM_BORDER,
      this.canvas.height / 2 - Paddle.PADDLEHEIGHT,
      this
    );
    this.paddleD = new Paddle(
      this.canvas.width - DISTANCE_FROM_BORDER * 2,
      this.canvas.height / 2 - Paddle.PADDLEHEIGHT,
      this
    );
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the paddle
    this.paddleG.draw(this.context);
    this.paddleD.draw(this.context);
    // draw and move the ball
    this.ball.draw(this.context);
    this.ball.move();

    this.ball.checkForCollisionWith(this.paddleG);
    this.ball.checkForCollisionWith(this.paddleD);
    // move the paddle
    this.paddleG.move();
    this.paddleD.move();
  }

  keyDownActionHandlerD(event) {
    switch (event.key) {
      case "ArrowUp":
        this.paddleD.moveUp();
        break;
      case "ArrowDown":
        this.paddleD.moveDown();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  keyUpActionHandlerD(event) {
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
      default:
        return;
    }
    event.preventDefault();
  }

  keyDownActionHandlerG(event) {
    switch (event.code) {
      case "KeyW":
        this.paddleG.moveUp();
        break;
      case "KeyZ":
        this.paddleG.moveDown();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  keyUpActionHandlerG(event) {
    switch (event.code) {
      case "KeyW":
        if (!this.paddleG.getDown()) {
          this.paddleG.stopMoving();
        }
        break;
      case "KeyZ":
        if (!this.paddleG.getUp()) {
          this.paddleG.stopMoving();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }
}
