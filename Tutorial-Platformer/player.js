// need a class for players
class Player {
    // the class needs a constructor and given variables position and speed 
    constructor(position, speed){
        this.position = position
        this.speed = speed
    }
    // needs a getter that returns a string of the player type for drawing purposes later
    get type() {
        return "player"
    }
    // Players needs a static create method that creates a new player object and is given a position 
    static create(position){
        // the method returns a new player object
        // player objects have two arguments that need to filled with two new vector positions, the first argument uses the plus method vector objects have to add a new vec object on the position that was given to the method
        // the second argument is speed which is calculated elsewhere so its zero for the x and y 
        return new Player(position.plus(new VectorPosition(0,-0.5)), new VectorPosition(0,0))

    }
}   

// three variables are needed before you can start the update method
// you'll need a player x speed, gravity and a jump speed 
// the values are set through trial and error so play around with it, speed is around a single digit number and the rest are low double digit

const playerXSpeed = 7 
const gravity = 30
const jumpSpeed = 17 

// this method is used to make the player move and jump 
// create a update method using the prototype method on Player, the method takes three arguments time, state and keys
// time is needed to see how long the key if held down, state is needed to know the current condition of the level and keys is needed for the direction the player wants to go 

Player.prototype.update = function(time, state, keys){
    // set a variable to hold the player speed when not moving 
    let xSpeed = 0
    // if the player holds down the left arrow key set the player's not moving speed equal to its self minus the const player x speed 
    // to get the arrow direction use ArrowLeft and ArrowRight on keys 
    if (keys.ArrowLeft) xSpeed -= playerXSpeed
    // if the player holds down the right arrow key set the players not moving speed equal to its self plus the const player x speed
    if(keys.ArrowRight)xSpeed += playerXSpeed
    // set a variable to hold the current player object's position 
    let position = this.position
    // set a variable to hold the moved position by taking the old position plus(method) pass in a new vector position and pass in the X speed of the player * time, time being how long they held the key and vector takes in to arguments for x and y since this was for setting the new position of x not y so the y position would remain at zero 
    let movedXPosition = position.plus(new VectorPosition(xSpeed * time, 0))
    // if not state level touches(method with three arguments) the moved position, the current player object size and "wall"
    // this will check to see if the position the player is trying to is a wall if it's not 
    if (!state.level.touches(movedXPosition, this.size, "wall")){
        // set the position of the player to the moved x position 
        position = movedXPosition
    }
    // set a variable to hold the y speed of the player
    // set it equal to the current player object's speed y property + the time * gravity 
    let playerYSpeed = this.speed.y + time * gravity
    // set a variable to hold the moved position 
    // position plus(method) new vector, vector holds the x and y 
    // the x didn't go anywhere so it's set to zero and the y is calculated by taking the y speed and * by time 
    let movedYPosition = position.plus(new VectorPosition(0, playerYSpeed * time ))
    // if not state level touches the moved position, the current player object size and "wall"
    // this will check to see if the position the player is trying to is a wall if it's not 
    if(!state.level.touches(movedYPosition,this.size, "wall")){
        // set the position of the player to the moved position
        position = movedYPosition
    // else if keys arrow up and y speed is greater than 0
    // this checks to see if the player did hit a wall but the wall is below it,
    }else if(keys.ArrowUp && playerYSpeed > 0 ){
        // set te y speed to equal its self - the jump speed 
        playerYSpeed -= jumpSpeed
    // else the player y speed is set to zero 
    //if he player jumped into a wall than their speed since set to zero and they'll fall back down
    }else {
        playerYSpeed = 0
    }

    return new Player(position, new VectorPosition(xSpeed, playerYSpeed))
    // return the new player object and pass in the new position and a new vector and pass in the x speed and y speed

}
// the player need a size method so give it a new vector position
// use the prototype method which "The JavaScript prototype property also allows you to add new methods to objects constructors:" do this instead of adding a getter because it would create a new vector object every time the property is read
Player.prototype.size = new VectorPosition(0.8, 1.5)
