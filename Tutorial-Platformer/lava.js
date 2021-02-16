// need a lava class to create lava objects 
class Lava {
    // lava needs a position, speed, and some object move back and forth so you need a reset position to make it reset back to where it started to look like its continuously moving 
    constructor(position, speed, reset){
        this.position = position 
        this.speed = speed 
        this.reset = reset 
    }

    // need a getter method that return the type of the lava object for drawing it out later 
    get type(){
        return "lava"
    }

    // going to need a static create for creating three types of lava depending on the character that is passed into the method 
    static create(position, char){
        // if its an "=" than is lava that moves horizontally
        if(char === "="){
        // create the object and pass in a vector position 
            return new Lava(position, new VectorPosition(2,0))
        // if its "|" than is vertical lava
        }else if (char === "|"){
            // same as before 
            return new Lava(position,new VectorPosition(0,2))
        // if its "v" than its dripping lava
        }else if (char === "v" ){
            // since its dripping it needs to be initialized with a reset position 
            return new Lava(position, new VectorPosition(0,3), position)
        }
    }
}

// since size is universal use the prototype method like you did for player 
Lava.prototype.size = new VectorPosition(1, 1)