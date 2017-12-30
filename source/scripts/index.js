let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let raf;

class Ball {
  constructor(options = {}) {
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.vx = options.vx || 2;
    this.vy = options.vy || 5;
    this.radius = options.radius || 25;
    this.color = options.color || '#0000FF';
  }
  
  updatePosition() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  flipHorizontalSpeed() {
    this.vx = -this.vx;
  }
  
  flipVerticalSpeed() {
    this.vy = -this.vy;
  }
  
  render(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

const NUMBER_OF_BALLS = 15;
const colorArray = ['#FF0000','#00FF00','#0000FF'];
const contructBallArray = (numberOfBalls, colorArray = []) => {
  let ballArray = [];
  
  for(let i=0; i<numberOfBalls; i++) {
    const colorIndex = i % colorArray.length;
    const options = {
      x: (i + 5) * 10,
      y: (i + 5) * 10,
      vx: Math.random() * (3 - (-1)) - 1,
      vy: Math.random() * (3 - (-1)) -1,
      color: colorArray[colorIndex]
    }
    ballArray.push(new Ball(options));
  }
  
  return ballArray;
}

let ballArray = contructBallArray(NUMBER_OF_BALLS, colorArray);

let draw = function() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  ballArray.forEach((ball) => {
    ball.render(ctx);

    const isOutsideVerticalBounds = ball.y + ball.vy > canvas.height - ball.radius || ball.y + ball.vy < 0 + ball.radius;
    const isOutsideHorizontalBounds = ball.x + ball.vx > canvas.width - ball.radius || ball.x + ball.vx < 0 + ball.radius;
    
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