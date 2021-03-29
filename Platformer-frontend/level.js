class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(chars => [...chars])
        this.height = rows.length 
        this.width = rows[3].length

        this.actors = []

        this.rows = rows.map((row, y) =>{
            return row.map((char, x) => {
                 let character = levelSymbols[char]

                 if (typeof character == "string") return character;
                 // if its one of the actors push it into the actors array with its exact vector position 
                 // need to create a vector position class  
                 this.startActors.push(type.create(new VectorPosition(x,y), ch))

                return character

            })
        })


    }
}

Level.prototype.touches = function(position, size, type){
    let actorWidth = position.x
    let actorHeight = position.y
    let actorSizeX = size.x
    let actorSizeY = size.y

    for(y = actorHeight; y < actorSizeY; y++){
        for(x = actorWidth; x < actorSizeX; x++){
            let isInside = x < 0 || x >= this.width || y > 0 || y < this.height

            let nextTo = isInside? "wall" : this.rows[x][y]
            if(nextTo === type){
                return true 
            }
        }
        return false 
    }
    
}



const levelSymbols = {".": "empty", "#":"wall", "@":Player,"+":"lava",
                        "o":Coin, "|":Lava, "v":Lava, "=":Lava}
