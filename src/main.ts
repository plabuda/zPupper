import * as Zdog from 'zdog';
import { Universe } from './VerletUniverse';
import { WindowInterface } from './WindowInterface';

let uni = new Universe('.zDogCanvas');

function addRandomPoint(): number {
  return uni.AddDot(
    new Zdog.Vector(
      {
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        z: Math.random() * 400 - 200
      }
    )
  )
}

new Zdog.Box({
  addTo: uni.illo,
  width: 600,
  height: 600,
  depth: 600,
  frontFace: false,
  backface: '#888',
  topFace: false,
  bottomFace: '#999',
  leftFace: false,
  rightFace: '#BBB'
});

new Zdog.Ellipse({
  addTo: uni.illo,
  translate: { y: 190 },
  rotate: { x: Zdog.TAU / 4 },
  stroke: 20,
  diameter: 160,
  color: '#222',
  fill: true,

});

new Zdog.Ellipse({
  addTo: uni.illo,
  translate: { y: 180 },
  rotate: { x: Zdog.TAU / 4 },
  stroke: 10,
  diameter: 60,
  color: '#DDD',
  fill: true,

});

function animate() {
  uni.Render(1 / 60);
  requestAnimationFrame(animate);
}

function* progress(): Generator {
  const distance = 160;
  let pole = addRandomPoint();
  yield;
  let counterpole = addRandomPoint();
  yield;
  uni.AddStick(pole, counterpole, distance, '#666');
  yield;
  let first = addRandomPoint();
  yield;
  for (let i = 0; i < 4; i++) {
    let last = addRandomPoint();
    yield;
    uni.AddStick(last, last - 1, distance, '#000');
    yield;
  }
  uni.AddStick(first, first + 4, distance, '#000');

  for (let i = 0; i < 5; i++) {
    uni.AddStick(pole, first + i, distance, '#066');
    yield;
    uni.AddStick(counterpole, first + 4 - i, distance, '#660');
    yield;

  }
  return;
}

animate();

const wi = new WindowInterface();
wi.OnSubmitHandler = () => { console.log('Test'); return false; };

const iterator = progress();

setInterval(() => iterator.next(), 50);