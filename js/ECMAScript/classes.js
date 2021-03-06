"use strict";

// pattern 1
function Car(color){
    // JS engine initializes |this| to Object.create(Car.prototype)
    this.color = color;
    this.leftFrontWheel  = new Wheel();
    this.rightFrontWheel = new Wheel();
    this.leftRearWheel   = new Wheel();
    this.rightRearWheel  = new Wheel();
    // JS engine returns |this| (if the return value isn't an object)
}

Car.prototype = {
    getColor : function(){
        return this.color;
    },
    changeWheel : function(position, newWheel){
        // ...
    }
};

var c = new Car("blue");
var c2 = new Car("black");

c.getColor();

/* ES6 
class Car{
    constructor(color){
        this.color = color;
        this.leftFrontWheel  = new Wheel();
        this.rightFrontWheel = new Wheel();
        this.leftRearWheel   = new Wheel();
        this.rightRearWheel  = new Wheel();
    }
    getColor : function(){
        return this.color;
    },
    changeWheel : function(position, newWheel){
        // ...
    }
}
*/


// pattern 1.1
function ElectricCar(color){
    Car.call(this, color); // super()
    
    this.battery = new ElectricBattery();
}

ElectricCar.prototype = Object.assign(
    Object.create(Car.prototype),
    {
        rechargeBattery: function(){
            this.battery.recharge();
        }
    }
)

var e = new ElectricCar('violet')

/* ES6 
class ElectricCar extends Car{
    constructor(color){
        super();
    
        this.battery = new ElectricBattery();
    }
    rechargeBattery: function(){
        this.battery.recharge();
    }
}
*/


// pattern 2
"use strict"; // début de fichier

function Car(color){
    var privAttr = 25;
        
    function privMethod1(i){
        return i+1;
    }

    return {
        getColor: function(x){
            return color;
        },
        what: function(x){
            return privAttr + privMethod1(x);
        },
        setAttr: function(a){
            privAttr = a;
        }
    }
}

var c = new Car(); // only exposes 'getColor' and 'what'
c.color // undefined

// pattern 3 (ES6)
var Car3 = (function(){
    var states = new WeakMap();
    
    function Car3(color){
        // JS engine initializes |this| to Object.create(Car3.prototype)
        var s = Object.create(null);
        states.set(this, s)
        
        s.color = color;
        s.leftFrontWheel  = new Wheel();
        s.rightFrontWheel = new Wheel();
        s.leftRearWheel   = new Wheel();
        s.rightRearWheel  = new Wheel();
        // JS engine returns |this| (if the return value isn't an object)
    }
    
    Car3.prototype = {
        getColor : function(){
            var s = states.get(this);
            return s.color;
        },
        changeWheel : function(position, newWheel){
            // ...
        }
    };
    
    return Car3;
})();

new Car3();

// pattern 4 with symbols 
// Not super useful because of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols



function Car(){
    'use strict';
    if(!this) return new Car();

}

Car()
new Car()