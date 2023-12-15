class Shape {
      constructor(x, y) {
            this.x =x;
            this.y=y;
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

      toSVGString() {
            return "  <circle cx='" + this.x +
                        "' cy='" + this.y +
                        "' r='" + 40 + "' />";
      }

}

//import * as Shape from "./shape.js";

class Draw {
      constructor() {
            this.savedSVG = "";
            this.currShape = new Circle(50, 50, 50);
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
      
            draw.currShape.width = Math.abs(draw.startX - draw.endX);
            draw.currShape.height = Math.abs(draw.startY - draw.endY);
            draw.currShape.x = draw.startX;
            draw.currShape.y = draw.startY;
      
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

}

function ellipseButton() {

}

function lineButton() {

}