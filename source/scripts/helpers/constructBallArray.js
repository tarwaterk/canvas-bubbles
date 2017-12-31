import Ball from '../classes/Ball';
import randomInteger from './randomInteger';

export default (numberOfBalls = 1, colorArray = []) => {
  let ballArray = [];
  
  for(let i=0; i<numberOfBalls; i++) {
    const colorIndex = i % colorArray.length;
    const options = {
      x: (i + 5) * 10,
      y: (i + 5) * 10,
      vx: randomInteger(1, 3),
      vy: randomInteger(1, 3),
      color: colorArray[colorIndex]
    }
    ballArray.push(new Ball(options));
  }
  
  return ballArray;
}