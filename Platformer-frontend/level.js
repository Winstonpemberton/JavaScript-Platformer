class Level {
    constructor(plan) {
        this.rows = plan.trim().split("\n").map(chars => [...chars])
        this.height = this.rows.length 
        this.width = this.rows[3].length

        this.actors = []

        // this.rows = rows.map(row, y =>{
        //     row.map(char, x => {

        //     })
        // })


    }
}

const levelSymbols = {".": "empty", "#":"wall", "@":Player, 
                        "o":Coin, "+":Lava, "v":Lava, "=":Lava}