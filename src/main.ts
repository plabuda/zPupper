import * as zdog_module from './zdog-point'
import * as Zdog from 'zdog'
import * as VectorUtils from './vector_utils'
import {Vector} from 'zdog';

let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.inner',
});

function TrackVectorArray(array: Vector[], start: Vector, stop: Vector, current: Vector, progress: number) : void
{
  const newCenter = VectorUtils.Ease(start, stop, progress);
  const diff = newCenter.copy();
  diff.subtract(current);
  current.set(newCenter);
  VectorUtils.AddToArray(array, diff);
  
}

const testArray : Zdog.Vector[] = 
[
  new Zdog.Vector({x:1, y:0, z:0}),
  new Zdog.Vector({x:0, y:1, z:0}),
  new Zdog.Vector({x:0.5, y:0, z:1}),
  new Zdog.Vector({x:0, y:0, z:0.5}),
]

let posArray : Zdog.Vector[] = [];

console.log(VectorUtils.Sum(testArray));
console.log(VectorUtils.Average(testArray));

let center = Dot('#900', { x: 0, y: 0, z: 0 });

let start = new Vector();
let stop = start.copy();
let current = center.translate;
let progress = 0;

let points: Zdog.Shape[] = [];

function reducer(prev: { x: any; y: any; z: any; }, curr: { translate: { x: any; y: any; z: any; }; }) {
  return {
    'x': prev.x + curr.translate.x,
    'y': prev.y + curr.translate.y,
    'z': prev.z + curr.translate.z
  };
}

function Dot(color: string, translation: { x: any; y: any; z: any; }) {
  return new Zdog.Shape({
    addTo: illo,
    stroke: 25,
    color: color,
    translate: translation
  });
}


function addPoint(x: number, y: number, z: number) {
  let dot = Dot('#F93', { x, y, z });
  points.push(dot);
  posArray.push(dot.translate);
  
  // Set the beginning of ease:
  start.set(VectorUtils.Average(posArray));
  current.set(start);
  progress = 0;
}

function addRandomPoint() {
  addPoint(
    Math.random() * 400,
    Math.random() * 400,
    Math.random() * 400
  )
}

// create illo

function animate() {
  progress += 1/90;
  if( progress > 1) 
  {
    progress = 1;
  }

  TrackVectorArray(posArray, start, stop, current, progress);

  // rotate illo each frame
  illo.rotate.y += 0.01;
  illo.updateRenderGraph();

  // animate next frame
  requestAnimationFrame(animate);
}

function populate(amount: number) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 10);
  }
}

populate(300);
animate();
zdog_module.helloWorld();