class Shape {
    constructor(x, y) {
          this.x =x;
          this.y=y;
          this.color = "#000000";
    }      

    drawShape() {
          throw new Error('NOT IMEPLEMENTED drawShape');
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

    drawShape() {
          this.width = Math.abs(draw.startX - draw.endX);
          this.height = Math.abs(draw.startY - draw.endY);
          this.color = document.getElementById("colorPicker").value;
          this.x = draw.startX;
          this.y = draw.startY;
    }

    toSVGString() {
          var diffX = draw.endX - draw.startX;
          var diffY = draw.endY - draw.startY;
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

          if(Math.sin(angle) > 0 && Math.cos(angle) > 0) {
                var a = -90;
          } else if(Math.sin(angle) > 0 && Math.cos(angle) < 0) {
                var a = -180;
          } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                var a = -270;
          } else if(Math.sin(angle) < 0 && Math.cos(angle) < 0) {
                var a = 0;
          }

          console.log(angle);
          return "<rect height='"+ w +
                      "' width ='"+ h + 
                      "' x='" + this.x + 
                      "' y='" + this.y  + "'" +
                      " transform='rotate("+ a + "," + 
                            draw.startX + "," +
                            draw.startY +")'" + 
                      " style='fill:"+ this.color + ";' />";
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
          super(x, y);
          this.radius = r;
    }

    drawShape() {
          this.x = draw.startX;
          this.y = draw.startY;
          this.color = document.getElementById("colorPicker").value;
          this.radius = Math.max(Math.abs(draw.startX - draw.endX), 
                                  Math.abs(draw.startY - draw.endY));
    }

    toSVGString() {
          return "  <circle cx='" + this.x +
                      "' cy='" + this.y +
                      "' r='" + this.radius  +
                      "' style='fill:"+ this.color + ";' />";
                }

}

class Line extends Shape {
    constructor(x1, y1, x2, y2) {
          super(x1, y1);
          this.x2 = x2;
          this.y2 = y2;
    }

    drawShape() {
          this.x1 = draw.startX;
          this.y1 = draw.startY;
          this.x2 = draw.endX;
          this.y2 = draw.endY;
          this.color = document.getElementById("colorPicker").value;
    }

    toSVGString() {
          return "  <line x1='" + this.x1 +
                "' y1='" + this.y1 +
                "' x2='" + this.x2 +
                "' y2='" + this.y2 + 
                "' style='stroke:"+ this.color + ";' />";
          }
}