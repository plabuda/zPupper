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

setTimeout(() => {
  uni.AddStick(0, 1, 150, '#000');
  uni.AddStick(1, 2, 150, '#000');
  uni.AddStick(2, 0, 150, '#000');

  uni.AddStick(0, 3, 150, '#066');
  uni.AddStick(1, 3, 150, '#066');
  uni.AddStick(2, 3, 150, '#066');

}, 5000);