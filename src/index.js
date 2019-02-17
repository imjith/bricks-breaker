import Game from "./game";

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

// const GAME_WIDTH = window.innerWidth;
// const GAME_HEIGHT = window.innerHeight;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

function gameLoop(timeStamp) {
  resizeCanvas();
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update();
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}
window.addEventListener("resize", resizeCanvas, false);
function resizeCanvas() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
}

requestAnimationFrame(gameLoop);
