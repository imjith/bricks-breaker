import detectCollission from "./detectCollission";

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.imgBrick = document.getElementById("brick");
    this.width = game.gameWidth / 15;
    this.height = 25;
    this.position = position;
    this.hide = false;
  }

  draw(ctx) {
    let grd = ctx.createLinearGradient(150.0, 0.0, 150.0, 300.0);

    // Add colors
    grd.addColorStop(0.192, "rgba(244, 36, 36, 1.000)");
    grd.addColorStop(0.871, "rgba(132, 7, 7, 1.000)");
    grd.addColorStop(0.954, "rgba(117, 5, 5, 1.000)");
    grd.addColorStop(0.991, "rgba(0, 0, 0, 1.000)");

    ctx.fillStyle = grd;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

    // ctx.drawImage(
    //   this.imgBrick,
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
  }

  update() {
    if (detectCollission(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.game.score++;
      this.hide = true;
    }
  }
}
