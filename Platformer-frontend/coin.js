class Coin{
    constructor(position,basePosition, wobble){
        this.position = position
        this.basePosition = basePosition
        this.wobble = wobble 
    }

    get type(){
        return "coin"
    }

    static create(position){
        let basePosition = position.plus(new VectorPosition(0.2,0.1))
       return new Coin(position, basePosition, Math.random() * Math.PI * 2)
    }
    
}

Coin.prototype.collide = function(state){
    let filterOutCurrentCoin = state.actors.map(actor => {
        actor != this
    })
    if (filterOutCurrentCoin.length === 0) state.status = "won"
    return new State(state.level, filterOutCurrentCoin, state.status)
}
const wobbleSpeed = 7, wobbleDist = .05 
Coin.prototype.update = function(time){
    let wobble = this.wobble + time * wobbleSpeed
    let wobblePosition = Math.sin(wobble) + wobbleDist
    return new Coin(this.basePosition.plus(new VectorPosition(0, wobblePosition)), this.basePosition, wobble)
}

Coin.prototype.size = new VectorPosition(.4,.6) 