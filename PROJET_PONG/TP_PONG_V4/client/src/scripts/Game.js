import Ball from './Ball.js';
import Paddle from './Paddle.js'
import MoveState from './MoveState';


/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  static DISTANCE_FROM_BORDER = 30;


  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.socket = null;
    this.raf = null;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas.width/2, (this.canvas.height - Ball.BALLHEIGHT)/2, this);
    this.randomDirectionFirstRound();
    this.paddles = this.initPaddles();
    this.player = null;
    this.state = this.onGoing();
  }

  initPaddles() {
    const paddleG = new Paddle(
      Game.DISTANCE_FROM_BORDER,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );

    const paddleD = new Paddle(
      this.canvas.width - Game.DISTANCE_FROM_BORDER - Paddle.PADDLEWIDTH,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );

    return [paddleG, paddleD];
  }

  randomDirectionFirstRound() {
    this.ball.horizontalSpeed *= Math.floor(Math.random() * 2) ? 1 : -1;
  }

  /** start this game animation */
  start() {
    this.socket = io();
    this.handleSocket();
    document.getElementById('start').value = 'Disconnect';
    this.animate();
  }
  /** stop this game animation */
  stop() {
    document.getElementById('start').value = this.socket.disabled? "Déconnecté" : this.onGoing() ? 'Jouer' : 'Appuyez sur Espace';
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));

    this.handleEndOfRound();
  }

  /** move then draw the bouncing ball and paddles */
  moveAndDraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const paddles = [this.paddles[0], this.paddles[1]];
    // draw the paddle
    paddles.forEach(paddle => paddle.draw(this.context));

    // draw and move the ball
    this.ball.draw(this.context);
    this.ball.move();
    paddles.forEach(paddle => this.ball.checkForCollisionWith(paddle));

    // move the paddles
    paddles.forEach(paddle => paddle.move());
  }

  /* If the ball stopped moving, determines a winner, disables the play/stop button, and stops the animation */
  handleEndOfRound() {
    if (!this.onGoing()) {
      this.determineWinner();
      this.handleDocumentEndOfRound();
      this.stop();
    }
  }

  /* Returns whether the ball is moving or not */
  onGoing() {
    return !this.ball.getStop();
  }

  /* Updates this.lastWinner value and adds one point to the corresponding paddle. Called once at the end of a round */
  determineWinner() {
    this.lastWinner = this.ball.x <= 0 ? this.paddles[1] : this.paddles[0];
    ++this.lastWinner.score;
  }

  /* Called at the end of round to prevent player from clicking the play/stop button until they pressed the spacebar */
  handleDocumentEndOfRound() {
    document.getElementById("score").textContent = `${this.paddles[0].score} - ${this.paddles[1].score}`;
    document.getElementById("start").disabled = true;
  }

  /* Called when round is over and player pressed the spacebar */
  reinitializeGame() {
    this.ball = new Ball(this.canvas.width / 2, (this.canvas.height - Ball.BALLHEIGHT) / 2, this);

    if (this.lastWinner == this.paddles[0]) {
      this.ball.horizontalSpeed = Ball.DEFAULT_SPEED;
      this.ball.x -= this.canvas.width / 4;
    }
    else {
      this.ball.horizontalSpeed = -Ball.DEFAULT_SPEED;
      this.ball.x += this.canvas.width / 4;
    }

    this.paddles.forEach(paddle => paddle.y = (this.canvas.height - Paddle.PADDLEHEIGHT) / 2);
    this.start();
    document.getElementById("start").disabled = false;
  }

  // ne pas bouger avant d'avoir connecté un player
  keyDownActionHandler(event) {
    switch (event.key) {
      case " ":
        if (!this.onGoing()) {
          this.reinitializeGame();
        }
        break;
      case "ArrowUp":
        this.declareMovement(this.player);
        this.player.moveUp();
        break;
      case "ArrowDown":
        this.declareMovement(this.player);
        this.player.moveDown();
        break;
     default: return;
   }
   event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
        if (!this.player.getDown()) {
          this.player.stopMoving();
        }
        break;
      case "ArrowDown":
        if (!this.player.getUp()) {
          this.player.stopMoving();
        }
        break;
     default: return;
   }
   event.preventDefault();
  }

  handleSocket() {
    const socket = this.socket;
    socket.on('number', (message) => this.welcomingMessage(message) );
    socket.on('other moved', (socketid, ...message) => this.declareOtherMovement(socketid, ...message));
  }

  welcomingMessage(message) {
    this.pNumber = message;
    if (message < 3) {
      this.player = this.paddles[this.pNumber - 1];
      console.log(this.player);

      console.log(`Welcome, player ${message}`);
      // afficher sur la page le numéro de joueur plutôt que dans la console
    }
    else {
      console.log("Connexion refused : too many players are already connected.")
    }
    if (this.socket.disabled) {
      this.stop();
    }
  }

  declareMovement(mobile) {
    this.socket.emit('movement', mobile.x, mobile.y);
  }

  // plutot qu'un affichage, bouger l'autre paddle si on entre dans le if
  declareOtherMovement(socketid, ...message) {
    if (socketid != this.socket.id)
      console.log(socketid, ...message)
  }

  
  

}
