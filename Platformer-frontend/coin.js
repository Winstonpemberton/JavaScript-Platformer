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
    let filtered = state.actors.filter(a => a != this)
    let status = state.status
    if (!filtered.some(a => a.type === "coin")) status = "won"
    return new State(state.level, filtered, status)
}
const wobbleSpeed = 6, wobbleDist = .1
Coin.prototype.update = function(time){
    let wobble = this.wobble + time * wobbleSpeed
    let wobblePosition = Math.sin(wobble) * wobbleDist
    return new Coin(this.basePosition.plus(new VectorPosition(0, wobblePosition)), this.basePosition, wobble)
}

Coin.prototype.size = new VectorPosition(.4,.6) 