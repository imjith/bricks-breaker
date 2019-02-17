export default function detectCollission(ball, gameObj) {
  let bottomOfTheBall = ball.position.y + ball.height;
  let topOfTheBall = ball.position.y;

  let topOfObj = gameObj.position.y;
  let bottomOfObj = gameObj.position.y + gameObj.height;
  let leftOfObj = gameObj.position.x;
  let rightOfObj = leftOfObj + gameObj.width;

  if (
    bottomOfTheBall >= topOfObj &&
    topOfTheBall <= bottomOfObj &&
    ball.position.x >= leftOfObj &&
    ball.position.x <= rightOfObj
  ) {
    return true;
  } else {
    return false;
  }
}
