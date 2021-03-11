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
            case "=":
              return new Lava(position)
              break;
            case "v":
              return new Lava(position)
              break;
            case "|":
             return new Lava(position)
              break;
            default:
              console.log("well something went wrong ")
          }
    }
}

Lava.prototype.size = new VectorPosition(1,1) 