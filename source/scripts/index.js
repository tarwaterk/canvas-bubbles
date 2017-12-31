//import Ball from './classes/Ball';
import constructBallArray from './helpers/constructBallArray';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let raf;

const NUMBER_OF_BALLS = 15;
const colorArray = ['#FF0000','#00FF00','#0000FF'];


let ballArray = constructBallArray(NUMBER_OF_BALLS, colorArray);

let draw = function() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  ballArray.forEach((ball) => {
    ball.render(ctx);

    const ballPos = ball.getPosition();
    const ballVelocity = ball.getVelocity();
    const ballRadius = ball.getRadius();
    const isOutsideVerticalBounds = ballPos.y + ballVelocity.vy > canvas.height - ballRadius || ballPos.y + ballVelocity.vy < 0 + ballRadius;
    const isOutsideHorizontalBounds = ballPos.x + ballVelocity.vx > canvas.width - ballRadius || ballPos.x + ballVelocity.vx < 0 + ballRadius;
    
    if(isOutsideVerticalBounds) {
      ball.flipVerticalSpeed();
    }
    if(isOutsideHorizontalBounds) {
      ball.flipHorizontalSpeed();
    }

    ball.updatePosition();
  });
  
  raf = window.requestAnimationFrame(draw);
}


canvas.addEventListener('mouseover', (e)=> {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', (e)=> {
  window.cancelAnimationFrame(raf);
});

ballArray.forEach((ball)=> {
  ball.render(ctx);
});