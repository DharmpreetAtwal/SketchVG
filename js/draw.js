import { Rect, Circle, Line, Polygon, PolyLine, Path, MyText } from "./shape.js";

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
      Draw.instance.currShape.drawShape();
      svg.innerHTML = Draw.instance.savedSVG + Draw.instance.currShape.toSVGString();
}

$(document).on('mousedown', function(event) {
      var coord = Draw.toSVGCoordinates(event, svg);
      Draw.instance.dragging = true;
      Draw.instance.startX = Math.round(coord[0]);
      Draw.instance.startY = Math.round(coord[1]);
      Draw.instance.endX = Math.round(coord[0]);
      Draw.instance.endY = Math.round(coord[1]);

      if( (Draw.instance.currShape instanceof Polygon 
            || Draw.instance.currShape instanceof Path)
            && inBounds()) {
            displayDrawing()
      }
});

$(document).on('mousemove', function(event) {
      if(Draw.instance.dragging && inBounds()) {
            var coord = Draw.toSVGCoordinates(event, svg);
            Draw.instance.endX = Math.round(coord[0])
            Draw.instance.endY = Math.round(coord[1])
            if(!(Draw.instance.currShape instanceof Polygon)) {
                  displayDrawing()
            }  
      }
});

$(document).on('mouseup', function(event) {
      if(inBounds()) {
            Draw.instance.dragging = false;
            displayDrawing()
            if(!(Draw.instance.currShape instanceof Polygon || Draw.instance.currShape instanceof Path)) {
                  Draw.instance.savedSVG = svg.innerHTML;
            } 
      }
});


// ANIMATION
var lastClicked = null;
$(".mybutton").on({
      "click": function(event) {
            if(!$(this).is(lastClicked)) {
                  if(lastClicked) {
                        lastClicked.animate({
                              top: '-=5',
                              opacity: '1.0'}, 
                              "slow");
                  }
      
                  $(this).animate({
                        top: '+=5',
                        opacity: '0.4'}, 
                        "slow");
                  
                  lastClicked = $(this);
                  console.log(lastClicked)
            }
      }, 
      "mouseenter": function(event) {
            if(!$(this).is(lastClicked)) {
                  $(this).animate({
                        top: '+=2'}, 
                        "fast"); 
            }     
      }, 
      "mouseleave": function(event) {
            if(!$(this).is(lastClicked)) {
                  $(this).animate({
                        top: '-=2'}, 
                        "fast");   
            }
      }});

// UI

$("#selectButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = null;
});

$("#rectButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Rect(0, 0, 0, 0);
});
  
$("#circleButton").on("click",  function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Circle(0, 0, 0)
});
  
$("#lineButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Line();
});

$("#polygonButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Polygon();
});

$("#polylineButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new PolyLine();
});

$("#pathButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new Path();
});

$("#textButton").on("click", function(event) {
      Draw.instance.savedSVG = svg.innerHTML;
      Draw.instance.currShape = new MyText();
      $("#textString").val("ENTER TEXT");
});

$("#clearButton").on("click", function(event) {
      svg.innerHTML = "";
      Draw.instance.savedSVG = "";
      Draw.instance.currShape = new Line()
});

$("#fillPicker").on("change", function() {
      $(".customize").css('color', $(this).val());
});

$("#strokePicker").on("change", function() {
      $(".customize").css('border-color', $(this).val());
});

