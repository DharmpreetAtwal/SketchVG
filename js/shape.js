import { Draw } from "./draw.js";
import { Selector } from "./selector.js";

export class Shape {
      static list = [];
      constructor() {
            this.x =0;
            this.y=0;
            this.fill = "#000000";
      }      
  
      drawShape() {
            this.x = Draw.startX;
            this.y = Draw.startY;
            this.fill = $("#fillPicker").val();
            this.stroke = $("#strokePicker").val();
            this.strokeWidth = $("#strokeNumber").val();
      }

      toSVGString() {
            return "id='"+ this.index + "'";
      }
}
  
export class Rect extends Shape {
      constructor() {
            super();
            this.height = 0;
            this.width = 0;
      }
  
      drawShape() {
            super.drawShape();
            this.width = Math.abs( Draw.startX -  Draw.endX);
            this.height = Math.abs( Draw.startY -  Draw.endY);
      }

      toSVGString() {
            var diffX =  Draw.endX -  Draw.startX;
            var diffY =  Draw.endY -  Draw.startY;
            var angle = -1 * Math.atan(diffY/diffX);

            if(diffX < 0) {
                  angle =  angle + Math.PI
            }

            if(Math.tan(angle) > 0) {
                  var w = this.width;
                  var h = this.height; 
            } else {
                  var w = this.height;
                  var h = this.width;
            }
            let a=0;

            if(Math.sin(angle) > 0 && Math.cos(angle) > 0) {
                  a = -90;
            } else if(Math.sin(angle) > 0 && Math.cos(angle) < 0) {
                  a = -180;
            } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                  a = -270;
            } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                  a = 0;
            }

            return "<rect height='"+ w +
                        "' width ='"+ h + 
                        "' x='" + this.x + 
                        "' y='" + this.y  + "'" +
                        " transform='rotate("+ a + "," + 
                               Draw.startX + "," +
                               Draw.startY +")'" + 
                        " style='fill:"+ this.fill + 
                              "; stroke:" + this.stroke +
                              "; stroke-width:"+ this.strokeWidth + "' />";
      }
}

$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "rect";
            Selector.clickX = coord[0] - Selector.shape.attr('x');
            Selector.clickY = coord[1] - Selector.shape.attr('y');
      }
}, 'rect');

export class Circle extends Shape {
      constructor() {
            super();
            this.radius = 0;
      }

      drawShape() {
            super.drawShape()
            this.radius = Math.max(Math.abs( Draw.startX -  Draw.endX), 
                                    Math.abs( Draw.startY -  Draw.endY));
      }

      toSVGString() {
            return "  <circle cx='" + this.x +
                        "' cy='" + this.y +
                        "' r='" + this.radius  +
                        "' style='fill:"+ this.fill +
                              "; stroke:" + this.stroke +
                              "; stroke-width:"+ this.strokeWidth + "' />";
                  }

}

$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "circle";
            Selector.clickX = coord[0] - Selector.shape.attr('cx');
            Selector.clickY = coord[1] - Selector.shape.attr('cy');
      }
}, 'circle');

export class Line extends Shape {
      constructor() {
            super();
            this.x2 = 0;
            this.y2 = 0;
      }

      drawShape() {
            super.drawShape();
            this.x1 =  Draw.startX;
            this.y1 =  Draw.startY;
            this.x2 =  Draw.endX;
            this.y2 =  Draw.endY;
      }

      toSVGString() {
            return "  <line x1='" + this.x1 +
                  "' y1='" + this.y1 +
                  "' x2='" + this.x2 +
                  "' y2='" + this.y2 + 
                  "' style='stroke:" + 
                        this.stroke  +
                        "; stroke-width:"+ this.strokeWidth + "' />";
            }
}

$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "line";
            Selector.clickX = coord[0] - Selector.shape.attr('x1');
            Selector.clickY = coord[1] - Selector.shape.attr('y1');
      }
}, 'line');

export class Polygon extends Shape {
      constructor() {
            super();
            this.points = [];
      }

      drawShape() {
            super.drawShape()
            this.points.push([Draw.startX, Draw.startY]);
      }

      toSVGString() {
            let strPoints = "";

            this.points.forEach(point => {
                 strPoints = strPoints + point[0] + "," + point[1] + " ";
            });

            return "  <polygon points='" + strPoints + 
                  "' style='fill:"+ this.fill + 
                        "; stroke:" + this.stroke + 
                        "; stroke-width:" + this.strokeWidth + "' />";
      }
}

$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "poly";
            Selector.points = Selector.shape.attr('points').split(' ')
            Selector.points.pop();
            Selector.clickX = coord[0];
            Selector.clickY = coord[1];
      }
}, 'polygon, polyline');

// PolyLine class is almost extact copy of Polygon
// Only diff is <polygon> vs <polyline>
export class PolyLine extends Polygon {
      constructor() {
            super();
      }

      toSVGString() {
            let strPoints = "";
            this.points.forEach(point => {
                  strPoints = strPoints + point[0] + "," + point[1] + " ";
            });

            return "  <polyline points='" + strPoints + 
                  "' style='fill:none" + 
                        "; stroke:" + this.stroke + 
                        "; stroke-width:" + this.strokeWidth + "' />";
      }

}

export class Path extends Shape {
      constructor() {
            super();
            this.points = [];
            this.pointsToAdd = [];
      }

      drawShape() {
            super.drawShape();
            if(this.points.length == 0) {
                  this.points.push([Draw.startX, Draw.startY]);
            }
            else if(Draw.dragging && this.points.length > 0){
                  let diffX = Draw.endX - Draw.startX;
                  let diffY = Draw.endY - Draw.startY;

                  let prevPoint = this.points[this.points.length - 1]
                  let nextPoint = [Draw.startX, Draw.startY];
                  let midPoint = [((prevPoint[0] + nextPoint[0]) / 2) - diffX, 
                                    ((prevPoint[1] + nextPoint[1]) / 2) - diffY];

                  this.pointsToAdd = [midPoint, nextPoint];
            } 
            else if(((!Draw.dragging) && this.pointsToAdd.length == 2)) {
                  this.points.push(this.pointsToAdd[0])
                  this.points.push(this.pointsToAdd[1])
                  this.pointsToAdd = [];
            }
      }

      toSVGString() {
            let d = "M " + this.points[0][0] + " " + this.points[0][1];
  
            for(let i=1; i < this.points.length - 1; i=i+2) {
                  d = d + " Q " + this.points[i][0] + " " + this.points[i][1] + " " +
                        this.points[i+1][0] + " " + this.points[i+1][1];
            }

            if(this.pointsToAdd.length == 2) {
                  d = d + " Q " + this.pointsToAdd[0][0] + " " + this.pointsToAdd[0][1] + " " +
                  this.pointsToAdd[1][0]  + " " + this.pointsToAdd[1][1];
            }
            
            return "  <path d='"+ d + 
                  "' stroke='" + this.stroke + 
                  "' stroke-width='"+ this.strokeWidth + 
                  "' fill='none' />";
      }
}

// Points aren't seperated by commas
$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "path";
            Selector.points = Selector.shape.attr('d').split(' ')
            Selector.points = Selector.points.filter(word => !/[A-Z]/.test(word));
            Selector.clickX = coord[0];
            Selector.clickY = coord[1];
      }
}, 'path');

export class MyText extends Shape {
      constructor() {
            super();
      }

      drawShape() {
            super.drawShape();
      }

      toSVGString() {
            return "  <text x='"+ this.x + 
                        "' y='"+ this.y +
                         "' fill='"+ this.fill + 
                         "' stroke='"+ this.stroke  + 
                         "' font-size='"+ this.strokeWidth +"'>"+ $("#textString").val() + "</text>";
      }
}

$("svg").on({
      "mousedown": function(event) {
            let coord = Draw.toSVGCoordinates(event, svg);
            Selector.shape = $(this);
            Selector.savedTag = "text";
            Selector.clickX = coord[0] - Selector.shape.attr('x');
            Selector.clickY = coord[1] - Selector.shape.attr('y');
      }
}, 'text');