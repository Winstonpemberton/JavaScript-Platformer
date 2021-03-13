class State{
    constructor(level,actors,status ){
        this.level = level 
        this.actors = actors
        this.status = status 
    }

    static Start(level) {
        return new State(level, level.actors, "playing")
    }

    get player(){
        return this.actors.find(actor => actor.type === "player")
    }

}

