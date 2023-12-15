export class Shape {
    constructor(x, y) {
          this.x =x;
          this.y=y;
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

    toSVGString() {
          return "<rect height='"+ this.height +
                "' width ='"+ this.width + 
                "' x='" + this.x + 
                "' y='" + this.y  + "' />";
    }
}