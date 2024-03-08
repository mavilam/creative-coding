color = {
  'yellow': [255, 204, 0],
  'red': [255, 0, 0],
  'blue': [0, 0, 255],
}
verticalLines = []
horizontalLines = []
function setup() {
  createCanvas(400, 400);
  noStroke();
  quantity = random(5, 10);
  for(let i = 0; i < quantity; i++) {
    let ranx = random(-width, width);
    let rany = random(-height, height);
    verticalLines.push(ranx);
    horizontalLines.push(rany);
  } 
}

function draw() {
  mondrianGenerator();
}

function mondrianGenerator() {
  background(255);
  translate(width / 2, height / 2);
  stroke(0);
  strokeWeight(10);
  verticalLines.forEach(l => {
    line(l, -height, l, height);
  });
  horizontalLines.forEach(l => {
    line(-width, l, width, l);
  });
}
