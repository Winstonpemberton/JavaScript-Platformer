class Lava{
    constructor(position, speed, reset){
        this.position = position
        this.speed = speed 
        this.reset = reset 
    }

    get type(){
        return "lava"
    }
    
    static create(position, character){
        switch(character) {
            case "=":
              return new Lava(position, new VectorPosition(3,0))
              break;
            case "v":
              return new Lava(position, new VectorPosition(0,2))
              break;
            case "|":
             return new Lava(position, new VectorPosition(0,2), position)
              break;
            default:
              console.log("well something went wrong ")
          }
    }
}

Lava.prototype.collide = function(state){
  return new State(state.level, state.actors, "lost")
}

Lava.prototype.update = function(time,state){
  let newLavaPosition = this.position.plus(this.speed.times(time))

  if(!state.level.touches(newLavaPosition, this.size, "wall")){
    return new Lava(newLavaPosition, this.speed, this.reset)
  } else if (this.reset){
    return new Lava(this.reset,this.speed, this.reset )
  }else {
    return new Lava(newLavaPosition, this.speed.times(-1))
  }
}


Lava.prototype.size = new VectorPosition(1,1) 