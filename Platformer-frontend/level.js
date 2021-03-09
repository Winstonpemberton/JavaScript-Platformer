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
                    this.actors.push(character.create(new VectorPosition(x,y)))
                }
                return character

            })
        })


    }
}

const levelSymbols = {".": "empty", "#":"wall", "@":Player,"+":"lava",
                        "o":Coin, "|":Lava, "v":Lava, "=":Lava}

const justWallsAndEmpty = {".": "empty", "#":"wall"}