import * as Zdog from 'zdog';
import * as VectorUtils from './vector_utils';
import { Universe } from './verlet_universe';
import * as zdog_module from './zdog-point';

let uni = new Universe('.inner');

function Dot(color: string, translation: { x: any; y: any; z: any; }) {
  return new Zdog.Shape({
    stroke: 25,
    color: color,
    translate: translation
  });
}

function addPoint(x: number, y: number, z: number) {
  let dot = Dot('hsla(100, 60%, 50%, 1)', { x, y, z });
  uni.addShape(dot);
}

function addRandomPoint() {
  addPoint(
    Math.random() * 200,
    Math.random() * 200,
    Math.random() * 200
  )
}

// create illo

function animate() {
  
  uni.illo.rotate.y += 0.01;
  uni.Render(1/60);
  // animate next frame
  requestAnimationFrame(animate);
}

function populate(amount: number) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 350);
  }
}

populate(30);
animate();
zdog_module.helloWorld();