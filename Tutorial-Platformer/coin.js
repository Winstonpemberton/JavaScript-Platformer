// need a coin class for coin methods 
class Coin{
    // theres going to be a wobble effect that makes it look like the coin is moving to make it a little more interesting so it needs a position, a base position and a wobble 
    constructor(position, basePosition, wobble) {
        this.position = position
        this.basePosition = basePosition
        this.wobble = wobble
    }
    // needs a getter that return "coin" for drawing later
    get type(){
        return "coin"
    }

    // needs a create method that takes in a position 
    static create(position){
        // need to calculate the basePosition by setting it to the given position which is going to be a vector object and using its plus method and adding a new value to it 
        let basePosition = position.plus(new VectorPosition(0.2, 0.1))
        // then create the coin and passing in its position, basePosition and "Math.random() * Math.PI * 2"
        // math code is for making coins move in a circle at different intervals since if you didn't have it they would circle at the same exact time
        return new Coin(position, basePosition, Math.random() * Math.PI * 2)
    }
}
// checks to see if the player collided with a coin 
// create a method called collied using the prototype method on the Coin class, the method has one argument which is state
Coin.prototype.collide = function (state) {
    // filter through the state's actors and check to see if any of the actors inside are not a coin 
    let filtered = state.actors.filter(a => a != this)
    // set a variable to the state's status 
    let status = state.status
    // if not filtered iterate through it using the some method and check to see if the type is equal to coin if it passes true set status to "won"
    // the some method passes true as soon as it finds the item it's set to look for 
    if (!filtered.some(a => a.type === "coin")) status = "won"
    // then return a new state and pass in the current state's level, filtered and status 
    return new State(state.level, filtered, status)
}
// set the wobble speed and wobble distance 
// 8 is a good wobble speed and .07 is a good distance
const wobbleSpeed = 8, wobbleDist = 0.07

// this function creates the wobble effect that coins will have 
// create a update function using prototype on the coin class, it takes in one argument time 
Coin.prototype.update = function (time) {
    // this sets how fast the coin is going wobble
    // set a variable to the current coin's wobble + time * the wobble speed 
    let wobble = this.wobble + time *  wobbleSpeed
    // this sets how far it will wobble and make it go in a circle using math's sin method 
    // set a variable to Math.sin and pass in the last variable and then multiply it by the wobble distance 
    let wobblePosition = Math.sin(wobble) * wobbleDist
    // this creates the coin with the wobble effect 
    // return a new coin object and pass in the base position plus a new vector position
    // the vector object needs two parameters filled, pass in 0 and the newly created wobble position
    // coins have three parameters, so next pass in the current coins base position and the newly created wobble 
    return new Coin(this.basePosition.plus(new VectorPosition(0, wobblePosition)), this.basePosition, wobble)
    
}
// since size is universal use the prototype method like you did for player 
Coin.prototype.size = new VectorPosition(0.6, 0.6);