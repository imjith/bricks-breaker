import detectCollission from "./detectCollission";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.imgBall = document.getElementById("ball");
    this.width = 10;
    this.height = 10;
    this.position = {
      x: game.paddle.position.x + this.width,
      y: game.paddle.position.y - this.height
    };

    this.speed = {
      x: 4,
      y: -7
    };
  }

  reset() {
    this.position = {
      x: this.game.paddle.position.x + this.width,
      y: this.game.paddle.position.y - this.height
    };
  }

  draw(ctx) {
    // ctx.drawImage(
    //   this.imgBall,
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );

    let grad = ctx.createLinearGradient(77, 0, 123, 200);
    grad.addColorStop(0, "#95D4FF");
    grad.addColorStop(1, "#0099FF");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //top or bottom
    if (this.position.y < this.game.scoreBoardLine) {
      this.speed.y = -this.speed.y;
    }

    //left or right
    if (this.position.x < 0 || this.position.x > this.gameWidth - this.width) {
      this.speed.x = -this.speed.x;
    }

    if (detectCollission(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      if (this.game.paddle.speed > 0) {
        //paddle moving to the right, ball shoudl move to the right
        this.speed.x = Math.abs(this.speed.x);
      } else if (this.game.paddle.speed < 0) {
        // paddle moving to the left, ball should move to the left
        this.speed.x = -Math.abs(this.speed.x);
      }
      this.position.y = this.game.paddle.position.y - this.height;
    }

    if (this.position.y >= this.gameHeight - this.height) {
      this.game.lives--;
      this.reset();
    }
  }
}
