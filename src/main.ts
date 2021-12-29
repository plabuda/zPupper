import * as zdog_module from './zdog-point'
import * as Zdog from 'zdog'
import * as VectorUtils from './vector_utils'

let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.inner',
});

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
let centerpos = center.translate;

let target = new Zdog.Vector( { x: 0, y: 0, z: 0 });
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
  centerpos.set(VectorUtils.Average(posArray));
  let inverted = centerpos.copy();
  inverted.multiply(-1);
  VectorUtils.AddToArray(posArray, inverted);
  //var res = points.reduce(reducer, { x: 0, y: 0, z: 0 });
  //console.log(res);
 // center.translate.x = res.x / points.length;
  //center.translate.y = res.y / points.length;
 // center.translate.z = res.z / points.length;

}

function addRandomPoint() {
  addPoint(
    Math.random() * 300 - 150,
    Math.random() * 300 - 150,
    Math.random() * 300 - 150
  )
}

// create illo

// add circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 180,
  stroke: 20,
  color: '#636'
});

function animate() {
  VectorUtils.Ease(centerpos, target, 0.05);
  // rotate illo each frame
  illo.rotate.y += 0.01;
  illo.updateRenderGraph();

  // animate next frame
  requestAnimationFrame(animate);
}

function populate(amount: number) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 1500);
  }
}

populate(10);
animate();
zdog_module.helloWorld();