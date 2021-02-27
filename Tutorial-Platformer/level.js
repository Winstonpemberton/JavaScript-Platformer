// Level class is need to create levels 
class Level {

    // levels need rows on creation and also need to be given a string of the planed level to create it 
    constructor(plan){
        // the level's constructor takes the planned level 
        // use the trim method to take out the white space(empty spaces) from the beginning and end but not in the middle 
        // then you can map the results so you'll get a array of characters so you can find out the width and height of the level using length 
        let rows = plan.trim().split("\n").map(l => [...l])

        this.height = rows.length 
        this.width = rows[0].length
        // the level is going to have moving characters so unlike the over all level structure it needs to be tracked differently in another array aka coins, character, enemies, lava these get pushed into this array 
        this.startActors = [];

        // now that you have the structure of the level you have to map inside of it 
        // first map row on the y axis aka up and down 
        this.rows = rows.map((row, y) => { 
            // since we're mapping the y we need to then map the x position to find the exact position of the actor objects 
            return row.map((ch, x) => {
                // while mapping the x position we also need to figure out what the actor is aka is it the player, lava, a coin ?
                let type = levelChars[ch]
                // set up an if statement to determine what it is 
                if (typeof type == "string") return type;
                // if its one of the actors push it into the actors array with its exact vector position 
                // need to create a vector position class  
                this.startActors.push(type.create(new VectorPosition(x,y), ch))
                // if its not an actor than it's empty space
                return "empty"
            })
        })
    }

}

// create a method touch using the prototype method on Level
// the function takes in three parameters position, size and type 
// the point of the method is to see if a type is touching another type
Level.prototype.touches = function(position, size, type) {
    // the point of doing this is to form a grind around the character to see if its touching anything 
    // set a variable to Math.floor and pass in the position.x 
    // Math.floor rounds any given number down 
    let xStart = Math.floor(position.x)
    // set a variable to Math.ceil and pass in the position.x 
    // MAth.ceil rounds any given number up 
    let xEnd = Math.ceil(position.x + size.x)
    // same as the first line but with position.y
    let yStart = Math.floor(position.y)
    // same as the second line but with position.y and size.y
    let yEnd = Math.ceil(position.y + size.y)

    // start a for loop and set a variable to the variable with floor position.y; if its less than the variable that holds position.y + size.y; if yes increase 
    for(let y =yStart; y < yEnd; y++){
        // set another for loop this time for x 
        for(let x = xStart; x <xEnd; x++){
            // create a variable that checks to see if something is outside the grid created around the character
            // set it to see if the current x loop variable is less than zero, greater than the level's width, if its y loop variable is less than 0 or is greater than or equal to this.height 
            let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        // create a ternary the checks if the last variable is true or false
        // if true than set it to "wall" if not than set it to the exact point using this.rows[y][x]
        let here = isOutside ? "wall" : this.rows[y][x]
        // if the last variable is the same as the type that was passed in to the function in the beginning than return true 
        if(here === type) return true 
        }
    // if the passed in object skips everything prior than just return false 
    }
    return false
    
}
// create an hash the holds the meaning of all the symbols in a planned level ie "@":Player
const levelChars ={
    ".": "empty", "#":"wall", "+":"lava",
    "@":Player, "o":Coin, "=":Lava, "|":Lava,
    "v":Lava 
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