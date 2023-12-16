export class Shape {
      constructor(x, y) {
            this.x =x;
            this.y=y;
      }      
  
      drawShape() {
            throw new Error('NOT IMEPLEMENTED drawShape');
      }

      toSVGString() {
            throw new Error('NOT IMEPLEMENTED toSVGSTRING');
      }
  }
  
export class Rect extends Shape {
      constructor(x, y, h, w) {
            super(x, y);
            this.height = h;
            this.width = w;
      }
  
      drawShape() {
            this.width = Math.abs(draw.startX - draw.endX);
            this.height = Math.abs(draw.startY - draw.endY);
            this.x = draw.startX;
            this.y = draw.startY;
      }

      toSVGString() {
            return "<rect height='"+ this.height +
                  "' width ='"+ this.width + 
                  "' x='" + this.x + 
                  "' y='" + this.y  + "' />";
      }
}

export class Circle extends Shape {
      constructor(x, y, r) {
            super(x, y);
            this.radius = r;
      }

      drawShape() {
            this.x = Math.abs(draw.startX - draw.endX);
            this.y = Math.abs(draw.startY - draw.endY);
            this.radius = 100;
      }

      toSVGString() {
            return "  <circle cx='" + this.x +
                        "' cy='" + this.y +
                        "' r='" + this.radius + "' />";
      }

}