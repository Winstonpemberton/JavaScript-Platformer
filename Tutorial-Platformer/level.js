// Level class is need to create levels 
class Level {

    // levels need rows on creation and also needs to be given a string of the planed level to create it 
    // the level's constructor takes the planned level 
    constructor(plan){
        // rows aren't needed at creation but it is needed for the level so a variable is needed to set it
        // use the trim method to take out the white space(empty spaces) from the beginning and end but not in the middle then use the split method to create a new line when it trims off the empty space then use map method to create an array of all the characters 
        let rows = plan.trim().split("\n").map(char => [...char])
        // now that you have the rows you can use it to figure out the height and width of the level 
        // to determine the height you use the length method on rows
        // this works because every time the the trim method moves down it creates another row
        let height = rows.length 
        // to get the width you use the length method on a row, remember that each row has characters in it
        let width = rows[0].length 
        // the level is going to have moving characters so unlike the overall level structure it needs to be tracked differently in another array aka coins, character, enemies, lava these get pushed into this array 
        let actorArray = []
        
        // now it's time to figure out what's inside of each row 
        // set the current levels row to a mapped row, inside the map use the arrow operator to start a function and set two variable row and y 
        // you're going from row to row also known as going down the y axis inside the map
        this.rows = rows.map((row,y) => {
            // now that you're inside a row you return another mapped row this time for x 
            // you're doing this because it's the only way to determine what is in every row and you can know until you go through it 
            // so inside the map use the arrow operator again to start a function and set two variable char and x 
            return row.map((char, x)=> {
                // now you have to see what type the character is by setting a variable to hold the value of the const letterChars and pass in the char 
                let type = letterChars[char]
                // now to see if the type is a string or not 
                // if the typeof method on type equals "string" than return the type 
                if(typeof type ==="string")return type
                // now using the current level object's actorArray push the type
                // inside the push method create the type and since all the actors have a create method that takes in a position and a char thats what you pass in 
                // create a new vector and pass in the x and y values and to finish creating pass in the char 
                this.actorArray.push(type.create(new VectorPosition(x, y), char))
                // finally return the type 
                return type 
            })
        })

    }


// create a method touch using the prototype method on Level
// the function takes in three parameters position, size and type 
// the point of the method is to see if a type is touching another type
    // the point of doing this is to form a grind around the character to see if its touching anything 
    // set a variable to Math.floor and pass in the position.x 
    // Math.floor rounds any given number down 
    // set a variable to Math.ceil and pass in the position.x 
    // MAth.ceil rounds any given number up 
    // same as the first line but with position.y
    // same as the second line but with position.y and size.y

    // start a for loop and set a variable to the variable with floor position.y; if its less than the variable that holds position.y + size.y; if yes increase 
        // set another for loop this time for x 
            // create a variable that checks to see if something is outside the grid created around the character
            // set it to see if the current x loop variable is less than zero, greater than the level's width, if its y loop variable is less than 0 or is greater than or equal to this.height 
        // create a ternary the checks if the last variable is true or false
        // if true than set it to "wall" if not than set it to the exact point using this.rows[y][x]
        // if the last variable is the same as the type that was passed in to the function in the beginning than return true 
    // if the passed in object skips everything prior than just return false 
    
// create an hash the holds the meaning of all the symbols in a planned level ie "@":Player
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