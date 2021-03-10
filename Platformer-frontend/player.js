class Player{
    constructor(position) {
        this.position = position
        // this.speed = speed
    }

    get type(){
        return "player"
    }
    
    static create(position){
        return new Player(position)
    }
}

function size(){
    return new VectorPosition(1,2)
}