let length,angle,an2,div,span;
let boradWidth = 50;
let totalNeedleSpawn = 500;
let total=0;
let red=0;
let pi;

let yarr = [];

function setup() {
  createCanvas(400, 400);
  background(200);
  fill(255,0,0);
  for (let y = 0; y <= height; y += boradWidth) {
    yarr.push(y);
    line(0,y,width,y);
  }
  noFill();
  stroke(0,255,0);
  strokeWeight(1);
  angleMode(RADIANS);
  div = createDiv("PI= ");
  div.style("color", "#FFF");
  div.style("display", "inline");
  span = createSpan("");
  span.style("color", "#FFF");
}

function draw() {
  for (let j=0; j <= 500; j++) {
    drawNeedle();
  }
  pi = 2*(length*total)/(red*boradWidth);
  span.html(pi, false);
}

function drawNeedle() {
  length = 25;
  an2 = random(TWO_PI);
  x1 = random(width);
  y1 = random(height);
  x2 = x1 + 25*cos(an2);
  y2 = y1 + 25*sin(an2);
  for (let i=0; i < yarr.length; i++) {
    if (checkLineIntersection(x1,y1,x2,y2,0,yarr[i],width,yarr[i]).onLine1) {
      stroke(255,0,0);
      line(x1,y1,x2,y2);
      red++;
      break;
    } else {
      stroke(0,255,0);
      line(x1,y1,x2,y2);
    }
  }
  total++;
}


// http://jsfiddle.net/justin_c_rounds/Gd2S2/
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}
