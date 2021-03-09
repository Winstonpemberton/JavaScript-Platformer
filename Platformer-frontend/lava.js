class Lava{
    constructor(position, speed, reset){
        this.position = position
        this.speed = speed 
        this.reset = reset 
    }

    get type(){
        return "lava"
    }
    
}

function size(){
    return new VectorPosition(1, 1)
}