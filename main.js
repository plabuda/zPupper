import * as zdog_module from './zdog-point.js'

let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.inner',
});

let center = Dot('#900', { x: 0, y: 0, z: 0 });
let oldCenter = { x: 0, y: 0, z: 0 };
let points = [];

function reducer(prev, curr) {
  return {
    'x': prev.x + curr.translate.x,
    'y': prev.y + curr.translate.y,
    'z': prev.z + curr.translate.z
  };
}

function Dot(color, translation) {
  return new Zdog.Shape({
    addTo: illo,
    stroke: 25,
    color: color,
    translate: translation
  });
}


function addPoint(x, y, z) {
  points.push(Dot('#F932', { x, y, z }));
  var res = points.reduce(reducer, { x: 0, y: 0, z: 0 });
  console.log(res);
  center.translate.x = res.x / points.length;
  center.translate.y = res.y / points.length;
  center.translate.z = res.z / points.length;

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
  diameter: 80,
  stroke: 20,
  color: '#6361'
});

function animate() {
  // rotate illo each frame
  illo.rotate.y += 0.01;
  illo.updateRenderGraph();

  // animate next frame
  requestAnimationFrame(animate);
}

function populate(amount) {
  if (amount > 0) {
    addRandomPoint();
    setTimeout(() => populate(amount - 1), 900);
  }
}

populate(10);
animate();
zdog_module.helloWorld();