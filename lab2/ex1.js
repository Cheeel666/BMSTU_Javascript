import{
  sqrt, pow
} from 'mathjs'

"use strict";


class Dot{
    constructor(x = 0, y = 0){
      this.x = x;
      this.y = y;
    }
    get_point(){
      return this;
    }
    print_point(){
      console.log(this);
    }
}

class Segment{
    constructor(x1, y1, x2, y2){
      this.firstDot = new Dot(x1,y1);
      this.secondDot = new Dot(x2,y2);
      this.len = this.lenght();
    }
    get_segment(){
      return this;
    }
    print_segment(){
      console.log("Segment: ",this);
    }
    lenght(){
      var len = sqrt(pow(this.firstDot.x - this.secondDot.x, 2) + pow(this.firstDot.y - this.secondDot.y, 2));
      return len;
    }
}

var dot = new Dot(5, 5);
var p = dot.get_point();
dot.print_point();
console.log(p);

var seg1 = new Segment(1,1,5,5);
seg1.print_segment();
