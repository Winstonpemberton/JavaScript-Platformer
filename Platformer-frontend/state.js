class State{
    constructor(level,actors,status ){
        this.level = level 
        this.actors = actors
        this.status = status 
    }

    static startLevel(level) {
        return new State(level, level.actors, "playing")
    }

    get player(){
        return this.actors.find(actor => actor.type === "player")
    }
}

State.prototype.update = function(time, keys){
    let updatedActors = this.actors.map(actor => actor.update(time,this, keys))
    let newState = new State(this.level, updatedActors, this.status)
    if (newState.status != "playing"){
        return newState
    }

    let player = newState.player 
    if(this.level.touches(player.position, player.size, "lava")){
       return new State(this.level, updatedActors, "lost")
    }

    for(let actor of updatedActors){
        if (actor != player && overlap(actor, player)){
            newState = actor.collide(newState)
        }
    }
    return newState 
}



function overlap(actor1, actor2 ){
    return actor1.position.x + actor1.size.x > actor2.position.x && 
        actor2.position.x + actor2.size.x > actor1.position.x && 
        actor1.position.y + actor1.size.y > actor2.position.y && 
        actor2.position.y + actor2.size.y > actor1.position.y
}
