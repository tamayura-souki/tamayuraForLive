const winX = 1920, winY = 1080;
const titleFont = "ニコモジ＋", infoFont = "ニコカ";

let captionJson, captionText={};
let titleSize = 108, titleN=5;
let subTitleSize = titleSize/3*2;
let lineColor, backColor;
let t=0;

function drawBack(x, y, size, n) {
  const spaceY = 30;
  beginShape();
  vertex(x-10-size,y+size+spaceY, 0);
  vertex(x+size*(n-1), y+size+spaceY, 0);
  vertex(x+size*n-10, y-10, 0);
  vertex(x-10,y-10,0);
  endShape(CLOSE);
}

function drawBottom() {
  const h = 48;
  noStroke();
  fill(64, 32, 220);
  rect(0, winY-h, winX, h);
  fill(230,230,248);
  textFont(infoFont, 32);
  var x = winX-t*1-subTitleSize*6;
  text(captionText.showInfo, x, winY-16);
  if(x+15*32<0) t=0;
  t++;

  strokeWeight(5);
  stroke(64, 32, 220);
  fill(backColor);
  drawBack(winX-subTitleSize*6, winY-subTitleSize, subTitleSize, 7);

  stroke(248);
  fill(lineColor);
  textFont(titleFont, subTitleSize);
  text(captionText.showTag, winX-subTitleSize*6, winY-16);
}

function drawTitle() {
  noStroke();
  fill(32,32,32,32);
  drawBack(titleSize*titleN+15, 15, subTitleSize, 14);
  drawBack(15, 15, titleSize, titleN);

  strokeWeight(3);
  stroke(lineColor);
  fill(backColor);
  drawBack(titleSize*titleN, 0, subTitleSize, 14);
  drawBack(0, 0, titleSize, titleN);

  strokeWeight(3);
  stroke(0);
  fill(248,32,8);
  textFont(titleFont, titleSize);
  text(captionText.showTitle, 20, titleSize+5);
  textFont(titleFont, subTitleSize);
  text(captionText.showSubTitle, titleSize*titleN, subTitleSize+5);
}

function preload() {
  captionJson = loadJSON("../shared/caption.json");
}

function setup() {
  createCanvas(winX, winY);
  lineColor = color(32,16,248);
  backColor = color(230,230,248);

  captionJson.data.forEach((elm) => {
    const rep = nodecg.Replicant(elm.id);
    rep.on("change", newValue => {
      captionText[elm.id] = newValue;
    });
  });
}

function draw() {
  clear();
  drawTitle();
  drawBottom();
}
