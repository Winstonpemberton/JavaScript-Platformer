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
                 this.actors.push(character.create(new VectorPosition(x,y), char))
                return "empty"

            })
        })


    }
}

Level.prototype.touches = function(position, size, type){
    let xStart = Math.floor(position.x -.3 )
    let xEnd = Math.ceil(position.x + size.x )
    let yStart = Math.floor(position.y + 1)
    let yEnd = Math.ceil(position.y + size.y)

    for(y = yStart; y < yEnd; y++){
        for(x = xStart; x < xEnd; x++){
            let isInside =  x < 0 || x >= this.width || y < 0 || y >= this.height;

            let nextTo = isInside? "wall" : this.rows[y][x]
            if(nextTo === type){
                return true 
            }
        }
        return false 
    }
    
}



const levelSymbols = {".": "empty", "#":"wall", "@":Player,"+":"lava",
                        "o":Coin, "|":Lava, "v":Lava, "=":Lava}
