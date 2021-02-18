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
// this method check to see if the player collided with lava 
// create a collide function using the prototype method on lava, the function has one parameter state
Lava.prototype.collide = function (state) {
    // return a new state object, state's constructor needs three arguments the states level, the state's actors and a new status which is going to be set to "lost"
    return new State(state.level, state.actors, "lost")
}

// this function moves lava objects which there's three kinds 
// create a function using prototype on the lava class, the function has two arguments, time and state
Lava.prototype.update = function (time, state) {
    // this moves the lava object by a specified amount 
    // set a variable to hold the current lava objects position plus the objects speed times the time parameter
    // the plus method that was created for the vector class takes in one argument and so does times 
    let newPosition = this.position.plus(this.speed.times(time))
    // this is for regular lava, if the spot next to it isn't a wall move it there
    // if not state's level touches the new position, the current lava object's size and "wall"
    // touches takes in three parameters, a position, size and aa object type
    if (!state.level.touches(newPosition,this.size, "wall")){
        // return a new Lava object at the new position, with the current object's speed and its reset
        return new Lava(newPosition, this.speed, this.reset)
    // else if the object's reset is true so it was given a reset value since not all lava has one 
    } else if (this.reset){
        // this else act like a loop for dripping lava, when it hits something it returns back to its starting position
        // than create a new lava object at the current objects reset point, its speed and again the current object's reset point 
        return new Lava(this.reset, this.speed, this.reset)
    // else 
    }else {
        // this is for bouncing lava,once it hits something it reverses the other direction 
        // return a new lava object and pass in the current lava objects position, and its speed times -1
        return new Lava(this.position, this.speed.times(-1))
    }
}

// since size is universal use the prototype method like you did for player 
Lava.prototype.size = new VectorPosition(1, 1)