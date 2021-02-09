// need a coin class for coin methods 
class Coin{
    // theres going to be a wobble effect that makes it look like the coin is moving to make it alittle more interesting so it needs a position, a base position and a wobble 
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
        let basePosition = position.plus(new VectorPostition(0.2, 0.1))
        // then create the coin and passing in its position, basePosition and "Math.random() * Math.PI * 2"
        // math code is for making coins move in a circle at different intervals since if you didnt have it they would circle at the same exact time
        return new Coin(position, basePosition, Math.random() * Math.PI * 2)
    }
}
// since size is universal use the prototype method like you did for player 
Coin.prototype.size = new VectorPostition(0.6, 0.6);