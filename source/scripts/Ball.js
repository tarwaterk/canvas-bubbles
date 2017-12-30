
export default class Ball {

  constructor(options = {}) {
    console.log("THIS RUNS");
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
