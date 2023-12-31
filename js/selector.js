import { Draw } from "./draw.js"

export class Selector {
    constructor() {
        Selector.clickX = 0
        Selector.clickY = 0
        Selector.shape = null;
        Selector.savedTag = "";
        Selector.points = [];
    }

    static move(event) {
        let coord = Draw.toSVGCoordinates(event, svg);
        switch(Selector.savedTag) {
            case "text":
            case "rect":
                Selector.shape.attr({x: (coord[0] - Selector.clickX), 
                                  y: (coord[1] - Selector.clickY)})
                break;
            case "circle":
                Selector.shape.attr({cx: (coord[0] - Selector.clickX), 
                                  cy: (coord[1] - Selector.clickY)})
                break;
            case "line":
                let diffX = Selector.shape.attr('x2') - Selector.shape.attr('x1');
                let diffY = Selector.shape.attr('y2') - Selector.shape.attr('y1');

                Selector.shape.attr({
                                  x1: (coord[0]) - Selector.clickX, 
                                  y1: (coord[1]) - Selector.clickY,
                                  x2: (coord[0] + diffX - Selector.clickX), 
                                  y2: (coord[1] + diffY - Selector.clickY) })
                break;
            case "poly":
                let pointsStr = "";

                Selector.points.forEach(function(pointC) {
                      let point = pointC.split(',');
                      pointsStr = pointsStr + 
                            (parseInt(point[0]) + coord[0] - Selector.clickX) + "," + 
                            (parseInt(point[1]) + coord[1] - Selector.clickY) + " ";
                });
                Selector.shape.attr({ points:pointsStr });
                break;
            case "path":
                let dStr = "M " + (parseInt(Selector.points[0]) + coord[0] - Selector.clickX) + " "
                + (parseInt(Selector.points[1]) + coord[1] - Selector.clickY) + " Q ";

                for(let i=2; i < Selector.points.length - 1; i+=4) {
                    dStr = dStr + (parseInt(Selector.points[i]) + coord[0] - Selector.clickX) + " "
                                + (parseInt(Selector.points[i + 1]) + coord[1] - Selector.clickY) + " "
                                + (parseInt(Selector.points[i + 2]) + coord[0] - Selector.clickX) + " "
                                + (parseInt(Selector.points[i + 3]) + coord[1] - Selector.clickY) 
                    if(i != Selector.points.length - 4 ) {
                        dStr = dStr + " Q "
                    }
                }

                Selector.shape.attr({ d:dStr });
                break;
        }
    }
}

