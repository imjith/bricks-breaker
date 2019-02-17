import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";

import { buildLevel, level1, level2, level3, level4, level5 } from "./level";

const GAME_STATES = {
  RUNNING: 0,
  PAUSED: 1,
  GAME_OVER: 2,
  MENU: 3,
  STOP: 4,
  LEVELUP: 5,
  NEXT_LIFE: 6,
  WAIT_FOR_KEY_PRESS: 7,
  GAME_WON: 8,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.scoreBoardLine = 50;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = 0;
    this.levels = [level1, level2, level3, level4, level5];
    this.level = 0;
    this.prevLive = 0;
    this.score = 0;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.gameState = GAME_STATES.MENU;
  }
  start() {
    if (this.gameState !== GAME_STATES.RUNNING) {
      if (this.gameState === GAME_STATES.PAUSED) {
        this.gameState = GAME_STATES.RUNNING;
      } else if (this.gameState === GAME_STATES.WAIT_FOR_KEY_PRESS) {
        this.gameState = GAME_STATES.RUNNING;
        this.ball.reset();
      } else if (this.gameState === GAME_STATES.NEXT_LIFE) {
        this.gameState = GAME_STATES.WAIT_FOR_KEY_PRESS;
        this.ball.reset();
      } else if (this.gameState === GAME_STATES.LEVELUP) {
        this.gameState = GAME_STATES.WAIT_FOR_KEY_PRESS;
        this.bricks = buildLevel(this, this.levels[this.level]);
        this.ball.reset();
      } else {
        this.lives = 3;
        this.prevLive = 3;
        this.bricks = buildLevel(this, this.levels[this.level]);
        this.gameObjects = [this.paddle, this.ball];
        this.gameState = GAME_STATES.RUNNING;
        this.ball.reset();
      }
    }
  }

  draw(ctx) {
    if (this.gameState === GAME_STATES.MENU) {
      this.fillGameScreen(ctx, "#000");
      this.drawMenu(ctx);
    } else if (this.gameState === GAME_STATES.GAME_WON) {
      this.fillGameScreen(ctx, "#000");
      this.drawText(ctx, "YOU WON");
    } else if (this.gameState === GAME_STATES.GAME_OVER) {
      this.fillGameScreen(ctx, "#000");
      this.drawText(ctx, "GAME OVER");
    } else {
      [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));
      this.drawScoreBoard(ctx);
      if (this.gameState === GAME_STATES.PAUSED) {
        this.fillGameScreen(ctx, "#00000055");
        this.drawText(ctx, "PAUSED");
      }
    }
  }

  fillGameScreen(ctx, clr) {
    let grad = ctx.createRadialGradient(100, 100, 0, 100, 100, 0);

    grad.addColorStop(0, "rgba(58,152,38,1)");
    grad.addColorStop(1, "rgba(16,42,7,1)");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = grad;
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fill();
  }

  drawMenu(ctx) {
    ctx.font = "50px Consolas";
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.fillText("BRICKS BREAKER", this.gameWidth / 2, 50);

    this.drawText(ctx, "Press SPACEBAR to start the Game");
  }

  drawText(ctx, text) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }

  drawScoreBoard(ctx) {
    let bottomMargin = this.scoreBoardLine - 10;
    ctx.fillStyle = "#543c29";
    ctx.fillRect(0, 0, this.gameWidth, this.scoreBoardLine);

    ctx.font = "20px Consolas";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("LEVEL:" + (this.level + 1), 100, bottomMargin);

    ctx.fillText("♥ " + this.lives, this.gameWidth / 2, bottomMargin);

    ctx.fillText("SCORE:" + this.score, this.gameWidth - 100, bottomMargin);
  }

  update() {
    if (this.gameState === GAME_STATES.RUNNING) {
      [...this.gameObjects, ...this.bricks].forEach(obj => obj.update());
      this.bricks = this.bricks.filter(obj => !obj.hide);
      if (this.bricks.length === 0) {        
        if(this.level===5){
          this.gameState = GAME_STATES.GAME_WON;
        }else{
          this.gameState = GAME_STATES.LEVELUP;
          this.level++;
          this.start();
        }
      } else {
        if (this.lives === 0) {
          this.level = 0;
          this.score = 0;
          this.gameState = GAME_STATES.GAME_OVER;
        } else if (this.lives !== this.prevLive) {
          this.gameState = GAME_STATES.NEXT_LIFE;
          this.prevLive = this.lives;
        }
      }
    }
  }

  toggle() {
    if (this.gameState === GAME_STATES.RUNNING) {
      this.gameState = GAME_STATES.PAUSED;
    } else {
      this.gameState = GAME_STATES.RUNNING;
    }
  }
}
