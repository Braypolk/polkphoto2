const maxRadius = 50;

export default class Dot {
  constructor(x, y, r, g, b, imageX, imageY) {
    this.x = x
    this.y = y
    this.r = r
    this.g = g
    this.b = b
    this.dotRadius = 3
  }

  draw(c) {
    c.beginPath()
    c.arc(this.x, this.y, this.dotRadius, 0, 2 * Math.PI, false)
    c.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'
    c.fill()
  }

  update(c, mouse) {
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 10;
      }
    }
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    // console.log("update");
    this.draw(c);
  }
}