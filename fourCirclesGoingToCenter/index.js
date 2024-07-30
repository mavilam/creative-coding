var circles = []
var acceleration = 0.1

function setup() {
  createCanvas(400, 400)
  noStroke()
  let startingPoints = [
    {x: 900, y: 900}, 
    {x: -900, y: -900}, 
    {x: 900, y: -900}, 
    {x: -900, y: 900}
  ]
  startingPoints.forEach(element => {
    circles.push({
      start: createVector(element.x, element.y, 10), // In the Z coordinate, it's stored the speed
      rotating: false,
      angle: 0,
      radius: 0,
      direction: 1, // Set the initial direction to "outwards"
      limitReached: false,
      firstAngle: 0,
    })
  })
}

function draw() {
  moveAndIncreaseCircle()
}

function moveAndIncreaseCircle() {
  background(0)
  fill(255)
  translate(width / 2, height / 2)

  circles.forEach((currentCircle) => {
    if (currentCircle.start.z > 40 && !currentCircle.limitReached)
      handleRotatingState(currentCircle)
    else
      handleApproachingToCenter(currentCircle)
  })
}

function handleRotatingState(currentCircle) {
  let { start } = currentCircle
  if (!currentCircle.rotating) {
    // Initialize the rotating state
    currentCircle.rotating = true
    currentCircle.angle = atan2(start.y, start.x)
    currentCircle.radius = sqrt(start.x * start.x + start.y * start.y) / start.z
    currentCircle.firstAngle = currentCircle.angle
  }
  let x = currentCircle.radius * cos(currentCircle.angle)
  let y = currentCircle.radius * sin(currentCircle.angle)
  currentCircle.angle += acceleration * 0.2
  
  if (currentCircle.angle - currentCircle.firstAngle >= TWO_PI) {
    // End the rotating state and start the moves away move
    console.log('limitReached')
    currentCircle.limitReached = true
    currentCircle.direction = -1
    currentCircle.rotating = false
  }
  circle(x, y, 16) // Draw the circle with the adjusted coordinates
}

function handleApproachingToCenter(currentCircle) {
  let { start } = currentCircle
  start.z += acceleration * currentCircle.direction
  let x = start.x / start.z
  let y = start.y / start.z

  if (start.z <= 0) {
    console.log('reset')
    currentCircle.direction = 1 // Change the direction to "outwards"
    currentCircle.limitReached = false // Reset the complete state
    currentCircle.rotating = false // Reset the rotating state
  }
  circle(x, y, 16) // Draw the circle with the adjusted coordinates
}
