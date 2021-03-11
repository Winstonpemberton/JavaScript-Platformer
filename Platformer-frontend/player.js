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

Player.prototype.size = new VectorPosition(1,2) 