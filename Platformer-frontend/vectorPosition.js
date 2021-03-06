class VectorPosition{
    constructor(x, y){
        this.x = x 
        this.y = y
    }

    times(factor){
       return new VectorPosition(this.x * factor, this.y * factor)
    }

    plus(factor){
        return new VectorPosition(this.x + factor.x, this.y + factor.y)
    }

}