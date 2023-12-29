import * as Shape from "./shape.js";
import { Selector } from "./selector.js";

export class Draw {
      static savedSVG = "";
      static currShape = null;
      static dragging = false;
      static startX = 0;
      static startY = 0;
      static endX= 0;
      static endY= 0;

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

const svg = document.getElementById('svg');

function inBounds() {
      return (Draw.startX > 0 && Draw.startY > 0)
}

function displayDrawing() {
      if(!(Draw.currShape instanceof Selector)) {
            Draw.currShape.drawShape();
            svg.innerHTML = Draw.savedSVG + Draw.currShape.toSVGString();
      }
}

$(document).on('mousedown', function(event) {
      var coord = Draw.toSVGCoordinates(event, svg);
      Draw.dragging = true;
      Draw.startX = Math.round(coord[0]);
      Draw.startY = Math.round(coord[1]);
      Draw.endX = Math.round(coord[0]);
      Draw.endY = Math.round(coord[1]);

      if( (Draw.currShape instanceof Shape.Path) && inBounds()) {
            displayDrawing()
      } 
});

$(document).on('mousemove', function(event) {
      if(Draw.dragging && inBounds()) {
            var coord = Draw.toSVGCoordinates(event, svg);
            Draw.endX = Math.round(coord[0])
            Draw.endY = Math.round(coord[1])
            if(!(Draw.currShape instanceof Shape.Polygon)) {
                  displayDrawing()
            } 
      }
});

$(document).on('mouseup', function(event) {
      if(inBounds()) {
            Draw.dragging = false;
            displayDrawing()
            if(!(Draw.currShape instanceof Shape.Polygon 
                  || Draw.currShape instanceof Shape.Path)) {
                  Draw.savedSVG = svg.innerHTML;
            } 
      }
});

// UI
$("#selectButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Selector();
});

$("#rectButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.Rect();
});
  
$("#circleButton").on("click",  function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.Circle();
});
  
$("#lineButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.Line();
});

$("#polygonButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.Polygon();
});

$("#polylineButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.PolyLine();
});

$("#pathButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.Path();
});

$("#textButton").on("click", function(event) {
      Draw.savedSVG = svg.innerHTML;
      Draw.currShape = new Shape.MyText();
      $("#textString").val("ENTER TEXT");
});

$("#clearButton").on("click", function(event) {
      svg.innerHTML = "";
      Draw.savedSVG = "";
      Draw.currShape = new Shape.Line();
});

$("#fillPicker").on("change", function() {
      $(".customize").css('color', $(this).val());
});

$("#strokePicker").on("change", function() {
      $(".customize").css('border-color', $(this).val());
});