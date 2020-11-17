import {
  sqrt, pow, abs
}from 'mathjs'

"use strict";

class Triangle{
    constructor(sideF = 0, sideS = 0, sideT = 0){
      this.sideF = sideF;
      this.sideS = sideS;
      this.sideT = sideT;
    }
    init(sideF = 0, sideS = 0, sideT = 0){
      this.sideF = sideF;
      this.sideS = sideS;
      this.sideT = sideT;
    }
    exist(){
      return (this.sideF + this.sideS > this.sideT&&
              this.sideS + this.sideT > this.sideF&&
              this.sideF + this.sideT > this.sideS);
    }
    perimetre(){
      return (this.sideF + this.sideS + this.sideT);
    }

    // формула Герона
    area(){
      var per = this.perimetre()/2;
      return (sqrt(per * (per - this.sideF)*
                  (per - this.sideS)*
                  (per - this.sideT)));
    }
    proper(){
      var eps = 0.0001;
      return (this.exist() &&
              (abs(this.sideF - this.sideS) < eps&&
               abs(this.sideF - this.sideT) < eps&&
               abs(this.sideS - this.sideT) < eps));
    }
}

var t1 = new Triangle(1,1,1);
console.log(t1.exist());
var t2 = new Triangle(1,2,3);
var t3 = new Triangle(2,2,3);
console.log(t2.exist());
console.log(t1.perimetre(), t1.area());
console.log(t1.proper(), t2.proper(), t3.proper());
