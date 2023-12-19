import { Rect, Circle, Line, Polygon, PolyLine } from "./shape.js";

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
      var coord = Draw.toSVGCoordinates(event, svg);
      draw.dragging = true;
      draw.startX = coord[0];
      draw.startY = coord[1];

      if(draw.currShape instanceof Polygon && draw.startX > 0 && draw.startY > 0) {
            draw.currShape.drawShape();
            svg.innerHTML = draw.savedSVG + draw.currShape.toSVGString();
      }
}

document.onmousemove = function(event) {
      if(draw.dragging && draw.startX > 0) {
            var coord = Draw.toSVGCoordinates(event, svg);
            draw.endX = coord[0];
            draw.endY = coord[1];
            if(!(draw.currShape instanceof Polygon)) {
                  draw.currShape.drawShape();
                  svg.innerHTML = draw.savedSVG + draw.currShape.toSVGString();
            } 
      }
}

document.onmouseup =  function(event) {
      draw.dragging = false;
      if(!(draw.currShape instanceof Polygon)) {
            draw.savedSVG = svg.innerHTML;
      }
}

// UI

$("#rectButton").on("click", function(event) {
      draw.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Rect(0, 0, 0, 0);
});
  
$("#ellipseButton").on("click",  function(event) {
      draw.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Circle(0, 0, 0)
});
  
$("#lineButton").on("click", function(event) {
      draw.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Line(0, 0, 0, 0);
});

$("#polygonButton").on("click", function(event) {
      draw.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Polygon();
});

$("#polylineButton").on("click", function(event) {
      draw.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new PolyLine();
});

$("#clearButton").on("click", function(event) {
      svg.innerHTML = "";
      draw.savedSVG = "";
});