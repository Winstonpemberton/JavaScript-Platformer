class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(chars => [...chars])
        this.height = rows.length 
        this.width = rows[3].length

        this.actors = []

        this.rows = rows.map((row, y) =>{
            return row.map((char, x) => {
                return levelSymbols[char]
                

            })
        })


    }
}

const levelSymbols = {".": "empty", "#":"wall", "@":Player, 
                        "o":Coin, "+":Lava, "v":Lava, "=":Lava}

const justWallsAndEmpty = {".": "empty", "#":"wall"}