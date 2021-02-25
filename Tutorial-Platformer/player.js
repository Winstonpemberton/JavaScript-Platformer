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

// three variables are needed before you can start the update method
// you'll need a player x speed, gravity and a jump speed 
// the values are set through trial and error so play speed is around a single digit number and the rest are low double digit
const playerXSpeed = 7 
const gravity = 30 
const jumpSpeed = 17 

// this method is used to make the player move and jump 
// create a update method using the prototype method on Player, the method takes three arguments time, state and keys
// time is need to see how long the key if held down, state is needed to know the current condition of the level and keys is need for the direction the player wants to go 
Player.prototype.update = function (time, state, keys) {
    // set a variable to hold the player speed when not moving  
    let xSpeed = 0 
    // if the player holds down the left arrow key set the players not moving speed equal to its self minus the const player x speed 
    if (keys.ArrowLeft) xSpeed -= playerXSpeed
    // if the player holds down the right arrow key set the players not moving speed equal to its self plus the const player x speed
    if (keys.ArrowRight) xSpeed += playerXSpeed
    // set a variable to hold the current player object's position 
    let position = this.position
    // set a variable to hold the moved position by taking the old position plus(method) pass in a new vector position an pass in the speed of the player * time, time being how long they held the key and vector takes in to arguments for x and y since this was for setting the new position of x not y so the y position would remain at zero 
    let movedX = position.plus(new VectorPosition(xSpeed * time, 0))
    // if not state level touches the moved position, the current player object size and "wall"
    // this will check to see if the position the player is trying to is a wall if it's not 
    if (!state.level.touches(movedX, this.size, "wall")){
        // set the position of the player to the moved x position 
        position = movedX 
    }
    // set a variable to hold the y speed of the player
    // set it equal to the current player objects speed's y property + the time * gravity 
    let ySpeed = this.speed.y + time * gravity
    // set a variable to hold the moved position 
    // position plus(method) new vector, vector hold the x and y 
    // the x didn't go anywhere so its set to zero and the y is calculated by taking the y speed and * by time 
    let movedY = position.plus(new VectorPosition(0, ySpeed * time))
    // if not state level touches the moved position, the current player object size and "wall"
    // this will check to see if the position the player is trying to is a wall if it's not 
    if (!state.level.touches(movedY, this.size, "wall")){
        // set the position of the player to the moved position
        position = movedY
    // else if keys arrow up and y speed is greater than 0
    // this checks to see if the player did hit a wall but the wall is below it,
    } else if (keys.ArrowUp && ySpeed > 0){
        // set te y speed to equal its self - the jump speed 
        ySpeed =- jumpSpeed
    // if he player jumped into a wall than their speed is set to zero and they'll fall back down
    }else {
        ySpeed = 0
    }
    // return the new player object and pass in the new position and a new vector and pass in the x speed and y speed
    return new Player(position, new VectorPosition(xSpeed, ySpeed))
}

// the player need a size method so give it a vector position
// use the prototype method which "The JavaScript prototype property also allows you to add new methods to objects constructors:" do this instead of adding a getter because it would create a new vector object every time the property is read
Player.prototype.size = new VectorPosition(0.8, 1.5)