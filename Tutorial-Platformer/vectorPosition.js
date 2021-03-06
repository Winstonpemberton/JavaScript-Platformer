// the game needs why to find the position of characters
// it can also be used to determine the size of actors 
class VectorPosition {
    // the class needs a x and y value at creation 
    constructor(x, y){
        this.x = x 
        this.y = y
    }
    // an addition method is needed create a new vector object and change the position of x and y by add in new values
    plus(other){
        return new VectorPosition(this.x + other.x, this.y + other.y)
    }
    // a times method is needed to scale the speed of game actors and determine the distance traveled in that time 
    // it does this by multiplying the x and y position by a given number 
    times(factor){
        return new VectorPosition(this.x * factor, this.y * factor)
    }
}