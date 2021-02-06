// the game needs to check its state to see where everything is at all times 
// to do this you need a state class 
class State {
    // states need to initalized with a level, actors and status 
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