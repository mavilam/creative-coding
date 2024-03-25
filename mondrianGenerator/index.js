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
  background(255);
  noLoop();
  
  let minDistance = 60; 
  let maxLines = 4;
  verticalLines = generateLines(width, minDistance, maxLines);
  horizontalLines = generateLines(height, minDistance, maxLines);
  
  intersections = calculateIntersections(verticalLines, horizontalLines);

  let filledQuads = 5;
  for (let i = 0; i < filledQuads; i++) {
    randomQuads.push({color: random(Object.values(colors)), intersection: random(intersections)});
  }
}

function generateLines(dimension, minDistance, maxLines) {
  let lines = [];
  for (let i = 0; i < maxLines; i++) {
    let newLine;
    let tooClose  = true;
    while (tooClose) {
      newLine = random(-dimension / 2, dimension / 2);
      tooClose = lines.some(l => abs(l - newLine) < minDistance)
    }
    lines.push(newLine);
  }
  return lines
}


function draw() {
  mondrianGenerator();
}

function mondrianGenerator() {
  background(255);
  translate(width / 2, height / 2);

  randomQuads.forEach(quad => fillQuad(quad.intersection, intersections, quad.color));

  displayLines()
  //displayIntersetctions() //only for debugging
}

function displayIntersetctions() {
  randomQuads.forEach(quad => {
    fill(255, 0, 0); 
    noStroke();
    ellipse(quad.intersection.x, quad.intersection.y, 5, 5);
  })
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
  for (vertical of verticalLines) {
    for (horizontal of horizontalLines) {
      let x = vertical;
      let y = horizontal;
      intersections.push(createVector(x, y));
    }
  }

  return intersections
}

function findNearestIntersection(vector, intersections, isRelevantIntersection) {
  let prevDistance = Infinity;
  let nearest = null;

  const relevantIntersections = intersections.filter(isRelevantIntersection);

  relevantIntersections.forEach(intersection => {
    let distance = dist(vector.x, vector.y, intersection.x, intersection.y);
    if (distance < prevDistance && distance > 0) {
      prevDistance = distance;
      nearest = intersection;
    }
  })
  return nearest;
}

function findNearestVerticalIntersection(vector, intersections) {
  return findNearestIntersection(vector, intersections, (i) => i.x === vector.x);
}

function findNearestHorizontalIntersection(vector, intersections) {
  return findNearestIntersection(vector, intersections, (i) => i.y === vector.y);
}
