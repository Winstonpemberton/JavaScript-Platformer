class Lava{
    constructor(position){
        this.position = position
        // this.speed = speed 
        // this.reset = reset 
    }

    get type(){
        return "lava"
    }
    
    static create(position, character){
        switch(character) {
            case character === "=":
              new Lava(position)
              break;
            case character === "v":
              new Lava(position)
              break;
            case character === "v":
              new Lava(position)
              break;
            default:
              console.log("well something went wrong ")
          }
    }
}

function size(){
    return new VectorPosition(1, 1)
}