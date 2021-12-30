import * as Zdog from 'zdog';
import { Snap } from './vector_utils';
import { Universe } from './verlet_universe';

let uni = new Universe('.inner');

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

function animate() {

 // uni.illo.rotate.y += 0.01;
  uni.Render(1 / 60);
  requestAnimationFrame(animate);
}

function populate(amount: number) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 350);
  }
}

//populate(4);
animate();

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
  //let first = addRandomPoint();
  let last = first;
  yield;
  uni.AddStick(pole, last, distance, '#066');
  yield;
  uni.AddStick(counterpole, last, distance, '#660');
  yield
  for (let i = 0; i < 5; i++) {
    let next = addRandomPoint();
    yield;
    uni.AddStick(last, next, distance, '#000');
    yield;
    uni.AddStick(pole, next, distance, '#066');
    yield;
    uni.AddStick(counterpole, next, distance, '#660');
    yield

    last = next;

  }

  uni.AddStick(first, last, distance, '#000');
}

const iterator = progress();

setInterval(() => iterator.next(), 50);

// setTimeout(() => {
//   uni.AddStick(0, 1, 150, '#000');
//   uni.AddStick(1, 2, 150, '#000');
//   uni.AddStick(2, 0, 150, '#000');

//   uni.AddStick(0, 3, 150, '#066');
//   uni.AddStick(1, 3, 150, '#066');
//   uni.AddStick(2, 3, 150, '#066');

// }, 5000);