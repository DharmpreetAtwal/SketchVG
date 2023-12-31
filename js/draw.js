import * as Shape from "./shape.js";
import { Selector } from "./selector.js";

const svg = document.getElementById("svg");

export class Draw {
  static savedSVG = "";
  static currShape = null;
  static dragging = false;
  static startX = 0;
  static startY = 0;
  static endX = 0;
  static endY = 0;

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
    let canvasX = (clientX - canvasRect.left) * scaleX + viewBox.x;
    let canvasY = (clientY - canvasRect.top) * scaleY + viewBox.y;

    return [Math.round(canvasX), Math.round(canvasY)];
  }
}

function inBounds() {
  let viewBox = svg.viewBox.baseVal;
  return Draw.startX - viewBox.x > 0 && Draw.startY - viewBox.y > 0;
}

function displayDrawing(event) {
  if (!(Draw.currShape instanceof Selector)) {
    Draw.currShape.drawShape();
    svg.innerHTML = Draw.savedSVG + Draw.currShape.toSVGString();
  } else {
    if (Selector.shape) {
      Selector.move(event);
    }
  }
}

$(function () {
  $(document).on("mousedown", function (event) {
    var coord = Draw.toSVGCoordinates(event, svg);
    Draw.dragging = true;
    Draw.startX = Math.round(coord[0]);
    Draw.startY = Math.round(coord[1]);
    Draw.endX = Math.round(coord[0]);
    Draw.endY = Math.round(coord[1]);

    if (Draw.currShape instanceof Shape.Path && inBounds()) {
      displayDrawing(event);
    }
  });

  $(document).on("mousemove", function (event) {
    if (Draw.dragging && inBounds()) {
      var coord = Draw.toSVGCoordinates(event, svg);
      Draw.endX = Math.round(coord[0]);
      Draw.endY = Math.round(coord[1]);
      if (!(Draw.currShape instanceof Shape.Polygon)) {
        displayDrawing(event);
      }
    }
  });

  $(document).on("mouseup", function (event) {
    Selector.shape = null;
    if (inBounds()) {
      Draw.dragging = false;
      displayDrawing(event);
      if (
        !(
          Draw.currShape instanceof Shape.Polygon ||
          Draw.currShape instanceof Shape.Path
        )
      ) {
        Draw.savedSVG = svg.innerHTML;
      }
    }
  });

  $(document).on("keypress", function (event) {
    let viewBox = svg.viewBox.baseVal;
    console.log(event.which);
    // W
    if (event.which == 119 || event.which == 87) {
      viewBox.y -= 10;
    }
    // A
    else if (event.which == 97 || event.which == 65) {
      viewBox.x -= 10;
    }
    //S
    else if (event.which == 115 || event.which == 83) {
      viewBox.y += 10;
    }
    //D
    else if (event.which == 100 || event.which == 68) {
      viewBox.x += 10;
      // E
    } else if (event.which == 101 || event.which == 69) {
      viewBox.width -= 100;
      viewBox.height -= 100;
    }
    // Q
    else if (event.which == 113 || event.which == 81) {
      viewBox.width += 100;
      viewBox.height += 100;
    }
  });
});
