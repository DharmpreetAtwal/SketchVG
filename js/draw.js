import * as Shape from "./shape.js";
import { Selector } from "./selector.js";

const svg = document.getElementById('svg');

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
            let clientX = event.clientX;
            let clientY = event.clientY;
      
            let viewBox = svg.viewBox.baseVal;
            let svgWidth = svg.width.baseVal.value;
            let svgHeight = svg.width.baseVal.value;

            let scaleX = viewBox.width / svgWidth;
            let scaleY = viewBox.height / svgHeight;

            let canvasRect = svg.getBoundingClientRect();
            let canvasX = (clientX - canvasRect.left) * scaleX  + viewBox.x;
            let canvasY = (clientY - canvasRect.top) * scaleY + viewBox.y;

            return [canvasX, canvasY];
      };
}


function inBounds() {
      let viewBox = svg.viewBox.baseVal;
      return (Draw.startX - viewBox.x  > 0 && Draw.startY - viewBox.y > 0)
}

function displayDrawing() {
      if(!(Draw.currShape instanceof Selector)) {
            Draw.currShape.drawShape();
            svg.innerHTML = Draw.savedSVG + Draw.currShape.toSVGString();
      }
}

$(function() {
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

      $(document).on('keypress', function(event) {
            let viewBox = svg.viewBox.baseVal;
            console.log(event.which)
            // W
            if(event.which == 119 || event.which == 87) {
                  viewBox.y -= 10 
            } 
            // A
            else if(event.which == 97 || event.which == 65) {
                  viewBox.x -= 10
            } 
            //S
            else if(event.which == 115 || event.which == 83) {
                  viewBox.y += 10
            } 
            //D
            else if(event.which == 100 || event.which == 68) {
                  viewBox.x += 10
            // E
            } else if(event.which == 101 || event.which == 69) {
                  viewBox.width -= 100;
                  viewBox.height -= 100;
            }
            // Q
            else if(event.which == 113 || event.which == 81) {
                  viewBox.width += 100;
                  viewBox.height += 100;
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

      $("#saveButton").on('click', function() {
            let drawingName = prompt("Enter the name of your drawing:");
            $.ajax({
                  url: '../php/save.php', 
                  method: 'POST', 
                  data: {
                        name: drawingName, 
                        drawing: svg.innerHTML
                  }, 
                  success: function(response) {
                        if(response.status == "success") {
                              console.log(response);
                        } else if(response.status == "errorname") {
                              console.log("Name taken");
                        }
                  }, 
                  error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                        console.log(status);
                        console.log(error)
                  }
            });       
      });

      $("#downloadButton").on('click', function() {
            let drawingName = prompt("Enter the name of your drawing:");
            $.ajax({
                  url: '../php/load.php', 
                  method: 'POST', 
                  data: {
                        name: drawingName, 
                  }, 
                  success: function(response) {
                        if(response.status == "success") {
                              svg.innerHTML = response.value;
                        } 
                  }, 
                  error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                        console.log(status);
                        console.log(error)
                  }
            });  
      });

      $("#fillPicker").on("change", function() {
            $(".customize").css('color', $(this).val());
      });

      $("#strokePicker").on("change", function() {
            $(".customize").css('border-color', $(this).val());
      });

});
