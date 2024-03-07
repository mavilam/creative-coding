var circles = [];
var acceleration = 0.1;

function setup() {
  createCanvas(400, 400);
  noStroke();
  let startingPoints = [
    {x: 900, y: 900}, 
    {x: -900, y: -900}, 
    {x: 900, y: -900}, 
    {x: -900, y: 900}
  ];
  startingPoints.forEach(element => {
    circles.push({
      start: createVector(element.x, element.y, 10),
      moving: false,
      angle: 0,
      radius: 0,
      direction: 1, // Asume la dirección inicial como hacia "afuera"
      completed: false,
      firstAngle: 0,
    });
  });
}

function draw() {
  moveAndIncreaseCircle();
}

function moveAndIncreaseCircle() {
  background(0);
  fill(255);
  translate(width / 2, height / 2);

  circles.forEach((currentCircle) => {
    let { start } = currentCircle;
    if (start.z > 40 && !currentCircle.completed) {
      if (!currentCircle.moving) {
        currentCircle.moving = true;
        currentCircle.angle = atan2(start.y, start.x);
        currentCircle.radius = sqrt(start.x * start.x + start.y * start.y) / start.z;
        currentCircle.firstAngle = currentCircle.angle;
      }
      let x = currentCircle.radius * cos(currentCircle.angle);
      let y = currentCircle.radius * sin(currentCircle.angle);
      currentCircle.angle += acceleration * 0.2;
      
      if (currentCircle.angle - currentCircle.firstAngle >= TWO_PI) { 
        currentCircle.completed = true;
        console.log('completed');
        currentCircle.direction = -1;
        currentCircle.moving = false;
      }
      circle(x, y, 16); // Dibuja el círculo con las coordenadas calculadas
    } else {
      start.z += acceleration * currentCircle.direction;
      let x = start.x / start.z;
      let y = start.y / start.z;

      if (start.z <= 0) {
        console.log('reset');
        currentCircle.direction = 1; // Cambia la dirección a 1 para mover los círculos hacia afuera de nuevo
        currentCircle.completed = false; // Restablece el estado completado
        currentCircle.moving = false; // Restablece el estado de movimiento
      }
      circle(x, y, 16); // Dibuja el círculo con las coordenadas ajustadas
    }
  });
}
