// Level class is need to create levels 
class Level {

    // levels need rows on creation and also need to be given a string of the planed level to create it 
    constructor(plan){
        // the level's constructor takes the planned level 
        // use the trim method to take out the white space(empty spaces) from the beginning and end but not in the middle 
        // then you can map the results so you'll get a array of characters so you can find out the width and height of the level using lenth 
        let rows = plan.trim().split("\n").map(l => [...l])

        this.height = rows.length 
        this.width = rows[0].length
        // the level is going to have moving characters so unlike the over all level structure it needs to be tracked differently in another array aka coins, character, enemies, lava these get pushed into this array 
        this.startActors = [];

        // now that you have the structure of the level you have to map inside of it 
        // first map row on the y axis aka up and down 
        this.rows = rows.map((row, y) => { 
            // since we're maping the y we neen to then map the x postion to find the exact postion of the actor objects 
            return row.map((ch, x) => {
                // while maping the x postion we also need to figure out what the actor is aka is it the player, lava, a coin ?
                let type = levelChars[ch]
                // set up an if statement to determine what it is 
                if (typeof type == "string") return type;
                // if its one of the actors push it into the actors array with its exact vector postion 
                // need to create a vector postion class  
                this.startActors.push(type.create(new Vec(x,y), ch))
                // if its not an actor than it's empty space
                return "empty"
            })
        })
    }

}

// example of a "plan" aka a planed level 
let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;