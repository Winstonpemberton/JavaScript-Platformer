class Coin{
    constructor(position){
        this.position = position
    }

    get type(){
        return "coin"
    }

    static create(position){
       return new Coin(position)
    }
    
}

Coin.prototype.size = new VectorPosition(.4,.6) 