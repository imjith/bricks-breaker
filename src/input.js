export default class InputHandler {
  constructor(paddle, game) {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 39:
          paddle.moveRight();
          break;
        case 37:
          paddle.moveLeft();
          break;
        case 27:
          game.toggle();
          break;
        case 32:
          game.start();
          break;
      }
    });

    window.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;
      }
    });
  }
}
