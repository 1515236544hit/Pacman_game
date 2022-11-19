const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ positions }) {
    this.positions = positions;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.positions.x, this.positions.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
];

const boundaries = [];

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            positions: {
              x: Boundary.width * j, // looping thru the row && filling the values
              y: Boundary.height * i, // looping thru the column && filling the values
            },
          })
        );
    }
  });
});

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.update();
}

addEventListener("keydown", ({ keys }) => {
  switch (keys) {
    case "w":
      player.velocity.y = -5;
      break;
    case "a":
      player.velocity.x = -5;
      break;
    case "s":
      player.velocity.y = 5;
      break;
    case "d":
      player.velocity.x = 5;
      break;
  }
});
