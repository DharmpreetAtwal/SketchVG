import { Rect, Circle, Line } from "./shape.js";

export class Draw {
      constructor() {
            if(Draw.instance) {
                  return Draw.instance;
            }

            this.savedSVG = "";
            this.currShape = new Line(0, 0, 0, 0);
            this.dragging = false;
            this.startX = 0;
            this.startY = 0;
            this.endX= 0;
            this.endY= 0;
            Draw.instance = this;

            return this;
      }

      setpos(x, y) {
            this.currShape.x = x;
            this.currShape.y = y;
      }

      static toSVGCoordinates(event, svg) {
            var clientX = event.clientX;
            var clientY = event.clientY;
      
            var canvasRect = svg.getBoundingClientRect();
            var canvasX = clientX - canvasRect.left;
            var canvasY = clientY - canvasRect.top;
      
            return [canvasX, canvasY];
      };
}

const draw = new Draw();
const svg = document.getElementById('svg');

document.onmousedown = function(event) {
      draw.dragging = true;
      var coord = Draw.toSVGCoordinates(event, svg);
      draw.startX = coord[0];
      draw.startY = coord[1];
}

document.onmousemove = function(event) {
      if(draw.dragging) {
            var coord = Draw.toSVGCoordinates(event, svg);
            draw.endX = coord[0];
            draw.endY = coord[1];
            draw.currShape.drawShape(draw);

            svg.innerHTML = draw.savedSVG + draw.currShape.toSVGString();
      }
}

document.onmouseup =  function(event) {
      draw.dragging = false;
      draw.savedSVG = svg.innerHTML;
}

// UI

document.getElementById("rectButton").onclick  = function(event) {
      Draw.instance.currShape = new Rect(0, 0, 0, 0);
  }
  
  document.getElementById("ellipseButton").onclick = function(event) {
      Draw.instance.currShape = new Circle(0, 0, 0)
  }
  
  document.getElementById("lineButton").onclick = function(event) {
      Draw.instance.currShape = new Line(0, 0, 0, 0);
  }

