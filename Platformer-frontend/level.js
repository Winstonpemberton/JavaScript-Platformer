class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(chars => [...chars])
        this.height = rows.length 
        this.width = rows[3].length

        this.actors = []

        this.rows = rows.map((row, y) =>{
            return row.map((char, x) => {
                 let character = levelSymbols[char]

                if(character instanceof Object){
                    this.actors.push(character.create(new VectorPosition(x,y), char))
                }
                return character

            })
        })


    }
}

Level.prototype.touches = function(position, size, type){
    let actorWidth = position.x.times(.1)
    let actorHeight = position.y.times(.1)
    let actorSizeX = size.x.times(.1)
    let actorSizeY = size.y.times(.1)

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
