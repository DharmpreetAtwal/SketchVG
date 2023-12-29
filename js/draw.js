import * as Shape from "./shape.js";
import { Selector } from "./selector.js";

export class Draw {
      constructor() {
            if(Draw.instance) {
                  return Draw.instance;
            }

            this.savedSVG = "";
            this.currShape = null;
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

function inBounds() {
      return (Draw.instance.startX > 0 && Draw.instance.startY > 0)
}

function displayDrawing() {
      if(!(Draw.instance.currShape instanceof Selector)) {
            Draw.instance.currShape.drawShape();
            svg.innerHTML = Draw.instance.savedSVG + Draw.instance.currShape.toSVGString();
      }
}

$(document).on('mousedown', function(event) {
      var coord = Draw.toSVGCoordinates(event, svg);
      Draw.instance.dragging = true;
      Draw.instance.startX = Math.round(coord[0]);
      Draw.instance.startY = Math.round(coord[1]);
      Draw.instance.endX = Math.round(coord[0]);
      Draw.instance.endY = Math.round(coord[1]);

      if( (Draw.instance.currShape instanceof Shape.Path)
            && inBounds()) {
            displayDrawing()
      } 
});

$(document).on('mousemove', function(event) {
      if(Draw.instance.dragging && inBounds()) {
            var coord = Draw.toSVGCoordinates(event, svg);
            Draw.instance.endX = Math.round(coord[0])
            Draw.instance.endY = Math.round(coord[1])
            if(!(Draw.instance.currShape instanceof Shape.Polygon)) {
                  displayDrawing()
            } 
      }
});

$(document).on('mouseup', function(event) {
      if(inBounds()) {
            Draw.instance.dragging = false;
            displayDrawing()
            if(!(Draw.instance.currShape instanceof Shape.Polygon || Draw.instance.currShape instanceof Shape.Path)) {
                  Draw.instance.savedSVG = svg.innerHTML;
            } 
      }
});

// UI
$("#selectButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Selector();
});

$("#rectButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.Rect();
});
  
$("#circleButton").on("click",  function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.Circle()
});
  
$("#lineButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.Line();
});

$("#polygonButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.Polygon();
});

$("#polylineButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.PolyLine();
});

$("#pathButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.Path();
});

$("#textButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Shape.MyText();
      $("#textString").val("ENTER TEXT");
});

$("#clearButton").on("click", function(event) {
      svg.innerHTML = "";
      Draw.instance.savedSVG = "";
      Draw.instance.currShape = new Shape.Line()
});

$("#fillPicker").on("change", function() {
      $(".customize").css('color', $(this).val());
});

$("#strokePicker").on("change", function() {
      $(".customize").css('border-color', $(this).val());
});