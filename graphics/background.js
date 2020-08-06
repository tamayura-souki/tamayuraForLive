const winX = 1920, winY = 1080, r=450, v = 0.4, lineWidth=10;
let bgColor, lineColor;
let t = 0;

const Ripple = class {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.v = 0;
    this.a = 0.005;
    this.transV = 0.005;
    this.trans = 0;
    this.minV = 2;
    this.maxV = 10;
    this.maxWait = 1;
    this.c = color(32,16,248);
  }

  draw() {
    if (this.trans<=-random(0, this.maxWait)){
      this.x = random(0, winX);
      this.y = random(0, winY);
      this.r = 0;
      this.v = random(this.minV, this.maxV);
      this.trans = 1.0;
    }

    strokeWeight(lineWidth*this.trans);
    stroke(this.c);
    this.c.setAlpha(this.trans*255);
    circle(this.x, this.y, this.r);
    this.v -= this.a;
    this.r += this.v;
    this.trans -= this.transV;
  }
}

function n_gon(n, x, y, r, deg) {
  deg = TWO_PI * deg / 360;
  beginShape();
  for(var i=0; i<n; i++) {
    var angle = TWO_PI / n * i + deg;
    var px = x + sin(angle) * r;
    var py = y + cos(angle) * r;
    vertex(px, py, 0);
  }
  endShape(CLOSE);
}

function magic_circle(t) {
  strokeWeight(lineWidth);
  stroke(lineColor);
  noFill();

  n_gon(3, winX/2, winY/2, r, v*t);
  n_gon(4, winX/2, winY/2, r, -v*t);
}

function setup() {
  frameRate(60);
  createCanvas(winX, winY);

  bgColor = color(230, 230, 248);
  lineColor = color(32,16,248);
  ripple = [];
  for(var i=0; i<3; i++){
    ripple.push(new Ripple());
  }
}

function draw() {
  background(bgColor);
  magic_circle(t);
  ripple.forEach(
    r => {r.draw()}
  );
  t++;
  if (t >= 36000) t = 0;
}