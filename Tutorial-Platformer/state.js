// the game needs to check its state to see where everything is at all times 
// to do this you need a state class 
class State {
    // states need to initialized with a level, actors and status 
    // actors are need to find the character and status is used to checked whether or not the player completed the level by getting all the coins 
    constructor(level, actors, status){
        this.level = level 
        this.actors = actors
        this.status = status 
    }
    // need a class method that will start the game 
    // the method creates a new state while filling its parameters using the level object and setting the game to playing 
    static start(level){
        return new State(level, level.startActors, "playing")
    }

    // since state now has an array of actors you need a getter method for going through that array to find the player
    get player(){
        return this.actors.find(a => a.type === "player")
    }
}
// this method updates the current state of the game by checking which keys are being held down and seeing if the player is touching lava 
// use the prototype method on State to create a new function that gets passed in time and keys 
// time is used to note how long the key is held down and keys is a array of keys that the player would use to move
State.prototype.update = function (time, keys) {
    // iterate over the this state's actors using map, each actor has an update method that takes in three parameters
    // time, the current state, and keys 
    // essentially you are setting a variable to hold an array of updated actors 
    let actors = this.actors.map(actor => actor.update(time, this, keys))
    // set a variable to a new State and pass in the current states level, the updated actors and the current states status 
    let newState = new State(this.level, actors, this.status)

    // if the new state's status isn't equal to playing return it 
    // if the game is over there's no point in continuing 
    if(newState.status != "playing") return newState
    // set a variable to the new state's player method  
    let player = newState.player
    // if this state's level touches, the level class's touches method has three parameters pass in player's position, player's size and the thing to check if it touches which is "lava"
    if (this.level.touches(player.position, player.size, "lava")){
        // if it returns true than return a new state as pass in the current level, actors and "lost"
        return new State(this.level, actors, "lost")
    }
    // use an advanced for loop to iterate over actors 
    for (let actor of actors){
        // if the current actor is not the player and overlap, which has two parameters pass in the actor and player
        if (actor != player && overlap(actor, player)){
            // set the new state to the current actor collide method which has one parameter so pass in the new state 
            newState = actor.collide(newState)
        }
    }
    // if for some reason nothing above worked just return the new state
    return newState
    
}
// this function checks to see if one actor is overlapping another 
// create a function called overlap and give it two parameters which will hold two different actors
function overlap(actor1, actor2) {
    // check to see if the position x plus the size of the actor's x is greater than the position.x of the second actor and vice versa 
    // then do the same thing for position.y and size.y 
    // this should return true or false 
    return actor1.position.x + actor1.size.x > actor2.position.x && actor1.position.x < actor2.position.x + actor2.size.x && actor1.position.y + actor1.size.y > actor2.position.y && actor1.position.y < actor2.position.y + actor2.size.y 
    
}