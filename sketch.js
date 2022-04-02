// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

// Steve's Makerspace added color, put some variables at the top, added click on canvas to pause, and added hit "s" to print canvas to jpg.  Play with variables below, lines 7 - 15.
// https://youtu.be/CSMcrKouQ3o

var colorInc = 1;  // Color change speed
var sat = 100; // saturation max 100
var brt = 100; // brightness max 100
var alph = 100; // alpha max 100
var numbPart = 300; // number of particles
var partStroke = 2; // line width
var angMult = 2; // 0.1 = straighter lines; 25+ = sharp curves
var angTurn = 1; // adjust angle for straight lines (after adjusting angMult)
var zOffInc = 0.0003; // speed of vector changes
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var hu = 0;
var p = 0;
let background_song;
let C;
let D;
let E;
let F;
let G;
let A;
let B;


function preload(){
  background_song = loadSound('vibe.mp3');
  C = loadSound('notes/Moo-Piano-C2.wav');
  D = loadSound('notes/Moo-Piano-D2.wav');
  E = loadSound('notes/Moo-Piano-E2.wav');
  F = loadSound('notes/Moo-Piano-F2.wav');
  G = loadSound('notes/Moo-Piano-G2.wav');
  A = loadSound('notes/Moo-Piano-A2.wav');
  B = loadSound('notes/Moo-Piano-B2.wav');

  C.setVolume(0.3);
  D.setVolume(0.3);
  E.setVolume(0.3);
  F.setVolume(0.3);
  G.setVolume(0.3);
  A.setVolume(0.3);
  B.setVolume(0.3);


}
function setup() {
  
  // intro_song.play();

  let myCanvas = createCanvas(778,512);   //windowWidth-20, windowHeight-20);
  myCanvas.parent("bigCanvas");
  
  colorMode(HSB,359,100,100,100);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }

  var c_1 = random(0,256);
  var c_2 = random(0,256);
  var c_3 = random(0,256);
  background(c_1, c_2, c_3);
}

function draw() {
  if (p>0){
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      // stroke(100, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += zOffInc;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
  hu +=colorInc; if (hu >359){hu=0}
  }
}

// function mousePressed(){
//   p=p*-1;
// }
// Save art as jpg.
function keyTyped() {
  if (key === "A"){
    p = abs(p) + 1;
  }
  if (key === "a"){
    p = -p;
  }

  if (key === "B"){
    brt += 10;
  }
  if (key === "b"){
    brt -= 10;
  }

  if (key === "S") {
    sat += 10
  }
  if (key === "s") {
    sat -= 10
  }

  if (key === "M"){
    background_song.loop();
  }

  if (key === "m"){
    background_song.stop();
  }

  if (key === "W"){
    partStroke += 1;
  }

  if (key === "w"){
    partStroke -= 1;
  }

  if (key === "N"){
    numPart += 50;
  }

  if (key === "n"){
    numPart -= 50;
  }

  if (key === "Q"){
    angMult += 5;
  }

  if (key === "q"){
    angMult -= 5;
  }

  if (key === "d"){
    save("myartwork.jpg");
  }

  if (key === "1"){
    C.loop();
    numPart += 50;
  }
  
  if (key === "2"){
    D.loop();
    brt-= 10;
  }

  if (key === "3"){
    E.loop();
    angMult *= 5;
  }

  if (key === "4"){
    F.loop();
    partStroke += 3;
  }

  if (key === "5"){
    G.loop();
    sat *= 3;
  }

  if (key === "6"){
    A.loop();
  }

  if (key === "7"){
    B.loop();
  }
  }

  function keyReleased() {
    if (key === "1"){
      C.stop();
      numPart -= 50;
    }

    if (key === "2"){
      D.stop();
      brt += 10;
    }
  
    if (key === "3"){
      E.stop();
      angMult *= 5;
    }
  
    if (key === "4"){
      F.stop();
      partStroke -= 3;
    }
  
    if (key === "5"){
      G.stop();
      sat /= 3;
    }
  
    if (key === "6"){
      A.stop();
    }
  
    if (key === "7"){
      B.stop();
    }
    
  }

