class Shape {
      constructor(x, y) {
            this.x =x;
            this.y=y;
            this.color = "#000000";
      }      
  
      drawShape() {
            throw new Error('NOT IMEPLEMENTED drawShape');
      }

      toSVGString() {
            throw new Error('NOT IMEPLEMENTED toSVGSTRING');
      }
  }
  
class Rect extends Shape {
      constructor(x, y, h, w) {
            super(x, y);
            this.height = h;
            this.width = w;
      }
  
      drawShape() {
            this.width = Math.abs(draw.startX - draw.endX);
            this.height = Math.abs(draw.startY - draw.endY);
            this.color = document.getElementById("colorPicker").value;
            this.x = draw.startX;
            this.y = draw.startY;
      }

      toSVGString() {
            var diffX = draw.endX - draw.startX;
            var diffY = draw.endY - draw.startY;
            var angle = -1 * Math.atan(diffY/diffX);

            if(diffX < 0) {
                  angle =  angle + Math.PI
            }

            if(Math.tan(angle) > 0) {
                  var w = this.width;
                  var h = this.height; 
            } else {
                  var w = this.height;
                  var h = this.width;
            }

            if(Math.sin(angle) > 0 && Math.cos(angle) > 0) {
                  var a = -90;
            } else if(Math.sin(angle) > 0 && Math.cos(angle) < 0) {
                  var a = -180;
            } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                  var a = -270;
            } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                  var a = 0;
            }

            console.log(angle);
            return "<rect height='"+ w +
                        "' width ='"+ h + 
                        "' x='" + this.x + 
                        "' y='" + this.y  + "'" +
                        " transform='rotate("+ a + "," + 
                              draw.startX + "," +
                              draw.startY +")'" + 
                        " style='fill:"+ this.color + ";' />";
      }
}

class Circle extends Shape {
      constructor(x, y, r) {
            super(x, y);
            this.radius = r;
      }

      drawShape() {
            this.x = draw.startX;
            this.y = draw.startY;
            this.color = document.getElementById("colorPicker").value;
            this.radius = Math.max(Math.abs(draw.startX - draw.endX), 
                                    Math.abs(draw.startY - draw.endY));
      }

      toSVGString() {
            return "  <circle cx='" + this.x +
                        "' cy='" + this.y +
                        "' r='" + this.radius  +
                        "' style='fill:"+ this.color + ";' />";
                  }

}

class Line extends Shape {
      constructor(x1, y1, x2, y2) {
            super(x1, y1);
            this.x2 = x2;
            this.y2 = y2;
      }

      drawShape() {
            this.x1 = draw.startX;
            this.y1 = draw.startY;
            this.x2 = draw.endX;
            this.y2 = draw.endY;
            this.color = document.getElementById("colorPicker").value;
      }

      toSVGString() {
            return "  <line x1='" + this.x1 +
                  "' y1='" + this.y1 +
                  "' x2='" + this.x2 +
                  "' y2='" + this.y2 + 
                  "' style='stroke:"+ this.color + ";' />";
            }
}

//import * as Shape from "./shape.mjs";

class Draw {
      constructor() {
            this.savedSVG = "";
            this.currShape = new Line(0, 0, 0, 0);
            this.dragging = false;
            this.startX = 0;
            this.startY = 0;
            this.endX= 0;
            this.endY= 0;
      }

      setpos(x, y) {
            this.currShape.x = x;
            this.currShape.y = y;
      }
}

const draw = new Draw();
const svg = document.getElementById('svg');

document.onmousedown = function(event) {
      draw.dragging = true;
      var coord = toSVGCoordinates(event, svg);
      draw.startX = coord[0];
      draw.startY = coord[1];
}

document.onmousemove = function(event) {
      if(draw.dragging) {
            var coord = toSVGCoordinates(event, svg);
            draw.endX = coord[0];
            draw.endY = coord[1];
            draw.currShape.drawShape();

            svg.innerHTML = draw.savedSVG + draw.currShape.toSVGString();
      }
}

document.onmouseup =  function(event) {
      draw.dragging = false;
      draw.savedSVG = svg.innerHTML;
}

function toSVGCoordinates(event, svg) {
      var clientX = event.clientX;
      var clientY = event.clientY;

      var canvasRect = svg.getBoundingClientRect();
      var canvasX = clientX - canvasRect.left;
      var canvasY = clientY - canvasRect.top;

      return [canvasX, canvasY];
};

/// UI

function rectButton() {
      draw.currShape = new Rect(0, 0, 0, 0);
}

function ellipseButton() {
      draw.currShape = new Circle(0, 0, 0);
}

function lineButton() {
      draw.currShape = new Line(0, 0, 0, 0);
}