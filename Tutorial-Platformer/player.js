// need a class for players
class Player {
    // the class needs to be given a position and speed 
    constructor(position, speed){
        this.position = position 
        this.speed = speed
    }

    // needs a getter that returns a string of the  player type for drawing purposes later
    get type() {
        return "player"
    }

    // class needs a create method that creates a new player object and is given a position 
    static create(position){
        // the method returns a new player while giving it positions by the vector class
        return new Player(position.plus(new VectorPosition(0, -0.5)), new VectorPosition(0,0))
    }
}

// the player need a size method so give it a vector position
// use the prototype method which "The JavaScript prototype property also allows you to add new methods to objects constructors:" do this instead of adding a getter because it would create a new vector object every time the property is read
Player.prototype.size = new VectorPosition(0.8, 1.5)