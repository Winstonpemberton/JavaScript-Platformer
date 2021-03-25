class Player{
    constructor(position, speed) {
        this.position = position
        this.speed = speed
    }

    get type(){
        return "player"
    }
    
    static create(position){
        return new Player(position.plus(new VectorPosition(0,-0.5)), new VectorPosition(0,0))
    }
}

const gravity = 30
const jumpSpeed = 20
const playerStartSpeed = 8

Player.prototype.update = function(time,state,keys){
    let playerXSpeed = 0
    if(keys.ArrowLeft){
        playerXSpeed += playerStartSpeed
    }
    if (keys.ArrowRight){
        playerXSpeed -= playerStartSpeed
    }
    let currentPosition = this.position 
    let movedXPosition = currentPosition.plus(new VectorPosition
        (playerXSpeed * time, 0))
    if (!state.level.touches(movedXPosition, this.size, "wall")){
        currentPosition = movedXPosition
    }

    let playerYSpeed = this.speed.y + time * gravity
    let movedYPosition = currentPosition.plus(new VectorPosition(0, playerYSpeed * time))
    if(!state.level.touches(movedYPosition, this.size, "wall")){
        currentPosition = movedYPosition
    }else if (key.ArrowUp && playerYSpeed > 0){
        playerYSpeed = -jumpSpeed
    }else {
        playerYSpeed = 0
    }

    return new Player(currentPosition, new VectorPosition(playerXSpeed, playerYSpeed))
}

Player.prototype.size = new VectorPosition(1,2) 