export default class Paddle {
  constructor(game) {
    this.width = 150;
    this.height = 20;
    this.maxSpeed = 7;
    this.speed = 0;
    this.gameWidth = game.gameWidth;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  draw(ctx) {
    let grad = ctx.createLinearGradient(77, 0, 123, 200);

    //#4E4E4E, #BABABA, #B0B3BA.
    grad.addColorStop(0, "#4E4E4E");
    grad.addColorStop(0.5, "#BABABA");
    grad.addColorStop(1, "#B0B3BA");

    ctx.fillStyle = grad;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x + this.width >= this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
}
