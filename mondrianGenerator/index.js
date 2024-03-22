let colors = {
  'yellow': "#FFD700",
  'red': "#FF0000",
  'blue': "#0000FF",
};

let verticalLines = [];
let horizontalLines = [];
let randomQuads = []
let intersections = [];
function setup() {
  createCanvas(600, 600);
  noStroke();
  let quantity = 4; // random(5, 10)
  for (let i = 0; i < quantity; i++) {
    let randomHeight = random(0, height);
    let randomWidth = random(0, width);
    verticalLines.push(randomWidth - width / 2); // Adjust due to the translate
    horizontalLines.push(randomHeight - height / 2);
  }

  let filledQuads = 4; // random(5, 10)

  intersections = calculateIntersections(verticalLines, horizontalLines);
  for (let i = 0; i < filledQuads; i++) {
    randomQuads.push({color: random(Object.values(colors)), intersection: random(intersections)});
  }
}

function draw() {
  mondrianGenerator();
}

function mondrianGenerator() {
  background(255);
  translate(width / 2, height / 2);

  for (let i = 0; i < randomQuads.length; i++) {
    fillQuad(randomQuads[i].intersection, intersections, randomQuads[i].color);
  }

  displayLines()
  for (let i = 0; i < randomQuads.length; i++) {
    fill(255, 0, 0); 
    noStroke();
    ellipse(randomQuads[i].intersection.x, randomQuads[i].intersection.y, 5, 5);
  }
}

function fillQuad(firstIntersetction, intersections, color) {
  const nearestVerticalIntersection = findNearestVerticalIntersection(firstIntersetction, intersections);
  const nearestHorizontalIntersection = findNearestHorizontalIntersection(firstIntersetction, intersections);
  const fourthIntersection = findNearestVerticalIntersection(nearestHorizontalIntersection, intersections);

  noStroke();
  fill(color);
  quad(firstIntersetction.x, firstIntersetction.y, nearestHorizontalIntersection.x, nearestHorizontalIntersection.y, fourthIntersection.x, fourthIntersection.y, nearestVerticalIntersection.x, nearestVerticalIntersection.y);
}

function displayLines() {
  stroke(0);
  strokeWeight(7);
  verticalLines.forEach(l => {
    line(l, -height, l, height);
  });
  horizontalLines.forEach(l => {
    line(-width, l, width, l);
  });
}

function calculateIntersections(verticalLines, horizontalLines) {
  const intersections = []
  for (let i = 0; i < verticalLines.length; i++) {
    for (let j = 0; j < horizontalLines.length; j++) {
      let x = verticalLines[i];
      let y = horizontalLines[j];
      intersections.push(createVector(x, y));
    }
  }

  return intersections
}

function findNearestIntersection(vector, intersections, isRelevantIntersection) {
  let prevDistance = Infinity;
  let nearest = null;

  const relevantIntersections = intersections.filter(isRelevantIntersection);

  for (let i = 0; i < relevantIntersections.length; i++) {
    let distance = dist(vector.x, vector.y, relevantIntersections[i].x, relevantIntersections[i].y);
    if (distance < prevDistance && distance > 0) {
      prevDistance = distance;
      nearest = relevantIntersections[i];
    }
  }
  return nearest;
}

function findNearestVerticalIntersection(vector, intersections) {
  return findNearestIntersection(vector, intersections, (i) => i.x === vector.x);
}

function findNearestHorizontalIntersection(vector, intersections) {
  return findNearestIntersection(vector, intersections, (i) => i.y === vector.y);
}
