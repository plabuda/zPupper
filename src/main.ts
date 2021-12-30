import * as Zdog from 'zdog';
import { Snap } from './vector_utils';
import { Universe } from './verlet_universe';

let uni = new Universe('.inner');

function addRandomPoint() {
  uni.AddDot(
    new Zdog.Vector(
      {
        x: Math.random() * 200,
        y: Math.random() * 200,
        z: Math.random() * 200
      }
    )
  )
}

function animate() {

  uni.illo.rotate.y += 0.01;
  uni.Render(1 / 60);
  requestAnimationFrame(animate);
}

function populate(amount: number) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 350);
  }
}

populate(4);
animate();


setTimeout(() =>
  setInterval(
    () => {

      uni.Snap(0, 1, 60);
      uni.Snap(1, 2, 60);
      uni.Snap(0, 2, 60);
    }, 1000
  ), 8000
);