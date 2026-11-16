let cnv;
let margin = 20
let centre;

let colours= {
  hov: '#ae2012',
  cardBack: '#9b2226',
  cardFront: '#ee9b00',
  backGround: '#0a9396',
  backGroundSec: '#4ecdc4'
}

function setup() {
  loadImages()
  cnv = createCanvas(windowWidth - margin, windowHeight - margin);
  cnv.position(margin / 2, margin / 2, 'fixed');
  background(colours.backGround);
  centre = { x: width / 2, y: height / 2 }
  textAlign(CENTER, CENTER)
  textSize(24)
  rectMode(CENTER)
  imageMode(CENTER)
  //loadPhysics()

  initElemnts()
}

function windowResized() {
  resizeCanvas(windowWidth - margin, windowHeight - margin);
  centre = { x: width / 2, y: height / 2 }
}

let isLoading = false

function handleData() {
  isLoading = false
  console.log('Handling data')

}

let hasData = false;

function draw() {
  background(colours.backGround);
  if (typeof fetchedData == 'object' && hasData == false) {
    handleData()
  }
  hasData = (typeof fetchedData == 'object')

  if (isLoading) {
    text('Loading...', centre.x, centre.y)
  }

  if (hasData) {
    drawCards()
  }

  drawFavouritesBar()
}
