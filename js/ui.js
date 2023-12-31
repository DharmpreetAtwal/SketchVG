import * as SVG from "./draw.js"
import * as Shape from "./shape.js";
import { Selector } from "./selector.js";

const svg = document.getElementById('svg');

$("#selectButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Selector();
});

$("#rectButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.Rect();
});

$("#circleButton").on("click",  function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.Circle();
});

$("#lineButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.Line();
});

$("#polygonButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.Polygon();
});

$("#polylineButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.PolyLine();
});

$("#pathButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.Path();
});

$("#textButton").on("click", function(event) {
    SVG.Draw.savedSVG = svg.innerHTML;
    SVG.Draw.currShape = new Shape.MyText();
    $("#textString").val("ENTER TEXT");
});

$("#clearButton").on("click", function(event) {
    svg.innerHTML = "";
    SVG.Draw.savedSVG = "";
    SVG.Draw.currShape = new Shape.Line();
});

$("#saveButton").on('click', function() {
    let drawingName = prompt("Enter the name of your drawing:");
    $.ajax({
          url: '../php/verify.php', 
          method: 'POST', 
          data: {
                name: drawingName, 
          }, 
          success: function(response) {
                if(response.status == "success") {
                      save(drawingName);
                } else if(response.status == "overwrite") {
                      let userInput = window.prompt("There exists another file with the same name. Overwrite?:");
                      console.log(userInput)
                      if(userInput !== null) {
                            save(drawingName);
                      } 
                } 
          }, 
          error: function(xhr, status, error) {
                console.log(xhr.responseText);
                console.log(status);
                console.log(error)
          }
    });    
});

function save(drawingName) {
    console.log("SAVING")
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
}

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
