class Shape {
      constructor(x, y) {
            this.x =x;
            this.y=y;
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
            this.x = draw.startX;
            this.y = draw.startY;
      }

      toSVGString() {
            return "<rect height='"+ this.height +
                  "' width ='"+ this.width + 
                  "' x='" + this.x + 
                  "' y='" + this.y  + "' />";
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
            this.radius = Math.abs(draw.startX - draw.endX);
      }

      toSVGString() {
            return "  <circle cx='" + this.x +
                        "' cy='" + this.y +
                        "' r='" + this.radius + "' />";
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
      }

      toSVGString() {
            return "  <line x1='" + this.x1 +
                  "' y1='" + this.y1 +
                  "' x2='" + this.x2 +
                  "' y2='" + this.y2 + 
                  "' style='stroke:rgb(0, 0, 255);stroke-width:2' />";
      }
}

//import * as Shape from "./shape.js";

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