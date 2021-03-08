// to start drawing, you're gonna need a dom display class

class DOMdisplay{
    // it needs to be given a parent and level at start
    // the parent parameter is going to be the tag that the display is going to be created into
    constructor(parent, level) {
        // using the helper method you can set this dom and give it the parameters "div", {class:"game"} and drawGrid method with the level passed into it 
        // div is the parent
        this.dom = elementHelper("div", {class: "game"}, drawGrid(level));
        // actors or characters are redrawn every time the display is updated so you need an actor layer to keep track of the actors so they can be replaced or moved, since theres nothing at creation set it to null 
        this.actorLayer = null;
        // once everything is done you can append the child, this dom, to the parent so it actually shows up
        parent.appendChild(this.dom)
    }
    // need a clear method that wipes everything off
    clear(){
        // this object comes with a dom method and the method has another method called remove
        this.dom.remove()
    }

}
// since you cant draw everything at 1 pixel because it would be tiny you need to set a scale
// 20 should be a good scale to start at 
const scale = 20

// going to need to draw the grid which takes in a level to actually draw 
function drawGrid(level) {
    // the method should return an element using the element helper method
    // element helper takes three arguments first being the name of the parent class so table, next the attributes 
    // the first attribute is background, the element helper method is expecting a hash so class is the key and the string "background" is its value. class is just dictating what the name of the table is going to be 
    //  inside the hash with background you need to set the width
    // using the style property set the width, since you give the method a level in the parameter use interpolation to use the width method and multiply it by the scale so it appropriately sized 
    // the last argument in the element helper is children which this is going to have so iterate through the level rows using map use element helper again because you're now trying to create table rows 
    // again the first argument is going to be the parent which in this case is "tr" or html for table row, second argument is setting the height using the html style attribute since you create the tables width by multiply it by the scale you can just give it the scale as its value
    // the third argument is going to create the cells so do the same process as before and create another element for as many rows there are "td" is html for table cells and class:type is going to be its attribute 
    return elementHelper("table", {class: "background", style: `width: 1600px`}, ...level.rows.map(row => elementHelper("tr", {style: `height: ${scale}px`}, ...row.map(type =>elementHelper("td", {class: type})))
        ))
        
}
// draw actor function that accepts actors 
function drawActors(actors) {
    // returns a newly created element 
    // element helper first creates a div parent, doesn't have any attributes and has children so it iterates through actors to create them
    return elementHelper("div", {}, ...actors.map(actor =>{
        // each element is just going to be called rect for rectangle 
        // creates another element with the parent being div, has a class attribute named actor for apply css later also uses interpolation to get the type of actor it is 
        let rect = elementHelper("div", {class: `actor ${actor.type}`});
        // sets the width of the actor using style.width 
        // since the actors class has a set size you need to multiply the size by the scale
        // same process for height, left and top
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.position.x * scale}px`;
        rect.style.top = `${actor.position.y * scale}px`;
        // return the rect so the first div gets the newly created child 
        return rect

    
    }))
}

// using the display class create a new anonymous function using prototype called syncState the function accepts a single parameter state
DOMdisplay.prototype.syncState = function(state) {
    
    // if the display object's actorLayer isn't empty than remove them 
    if(this.actorLayer) this.actorLayer.remove()
    // then redraw the actors in the actorLayer using the drawActors method while passing in state.actors
    // state is the parameter that was passed in to the function, the state would hold which actors that are still in the game by using its actors method 
    this.actorLayer = drawActors(state.actors)
    // since you redrew the actors you need to append the actorLayer to the dom 
    this.dom.appendChild(this.actorLayer)
    // set the doms className to the game's current status using interpolation 
    this.dom.className = `game ${state.status}`
    // the current object also uses a method called scrollPlayerIntoView method with the current state passed into it
    this.scrollPlayerIntoView(state)
}

// Camera scrolling
// create the function by using the prototype method on the Dom display class, the function take in one parameter
// use prototype because all of the Dom display objects are going to use it exactly the same way
DOMdisplay.prototype.scrollPlayerIntoView = function (state) {
    // set a variable to the clientWidth of the dom 
    // the client width is the the width of the element including its padding but not anything else
    // the css box model has 4 elements content, padding, border, margin from inner to outer
    let width = this.dom.clientWidth
    // set a variable height the same way but using clientHeight
    let height = this.dom.clientHeight
    // set a variable margin to width divided by three
    let margin = width/3 
    // set a variable left to the dom's scroll left method
    // set another variable right to left plus the width of the display  
    // scrollLeft is a method that manipulates the scroll position allowing it to follow the player's position 
    // scroll right stops it from going past the base point 
    let left = this.dom.scrollLeft, right = left + width
    // same as left but for scrollTop and setting bottom 
    let top = this.dom.scrollTop,bottom = top + height 
    // set a variable player to the state's player
    // state was a parameter in the function 
    let player = state.player
    // to get the center you use the player's position, use the method plus since its a vector object.
    // the plus method has an argument so you put in the players size,also a method player's have and using the times method multiply it by .5 and multiply it again by the scale 
    let center = player.position.plus(player.size.times(0.5)).times(scale)

    // if the center.x, its a vector object so it comes with an x property, is less than the left side plus the display's margin 
    if (center.x < left + margin){
        // change the dom's scrollLeft property to center.x minus the margin 
        // this checks to see if the camera is inside the acceptable viewing range 
        this.dom.scrollLeft = center.x - margin
    // else if the center.x is greater than right - margin 
    }else if (center.x > right - margin){
        // same as left but center.x adding the margin and subtracting the width 
        this.dom.scrollLeft = center.x + margin - width 
    }// if the center.y is lest than the top + margin 
    if (center.y <top + margin){
        // change the dom's scroll top to center/y - margin 
        this.dom.scrollTop = center.y - margin
    }// else if center.y is greater than bottom minus the margin 
    else if (center.y > bottom - margin){
        // same as the one before but the dom is being set to center.y plus the margin minus the height 
        this.dom.scrollTop = center.y + margin - height
    }
    // all of this is to make sure the camera stays with the player, they're other ways to do this like just having scrollUp and scroll left but apparently it looks very weird 
    
}
// this method is used to track if the player is pressing a key
// create a function trackKeys and give it one argument keys which would be an array of keys 
function trackKeys(keys) {
    // set a variable down to create a Object that's null 
    let down = Object.create(null)
    // inside the function create another function to track keys
    // give it one argument events 
    // it will track which listener event has been added
    function track(event) {
        // if keys includes(method) event key 
        // checks to see if one of the keys that was passed in is the key in the event 
        if (keys.includes(event.key)){
            // down should be a hash so set its key to the event key and have its value equal the event's type if it's equal to "key down "
            down[event.key] = event.type === "keydown"
            // events for keys by default move the page up and down to stop this use the preventDefault method on it 
            event.preventDefault()
        }
    }
    // add a new event listener to window, it has to arguments something to do to look for in this case "keydown" and what to do if it does find it which is use the track method 
    window.addEventListener("keydown", track)
    // do the same for "keyup"
    window.addEventListener("keyup", track)
    // finally return down 
    return down
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"])

// this is a helper method for doing animation 
// create a method called runAnimation which will have one argument frameFunction 
// frame function is telling the method how long to run the animation for
function runAnimation(frameFunc) {
    // create a variable to hold a null value 
    // this variable is going to hold the time the player spent away from the screen if they click another tab to look at 
    let lastTime = null 
    // create another function called frame 
    // this is used to actually create the frames for the animation, it takes in one argument, time 
    function frame(time) {
        // if last time doesn't equal null
        if (lastTime != null){
            // create a variable to hold the value of Math.min, since min accepts as many arguments that you want, pass in time - the last time, and 100 then divide that value by 1000
            // essentially this create a variable to hold the time to skip ahead depending on how long the player click onto a different tab 
            let timeStep = Math.min(time - lastTime, 100) / 1000
            // if frameFunction with the variable holding the skip time === false than return it 
            // this is to see if the animation need to keep going or to stop 
            if(frameFunc(timeStep) === false) return
        } 
        // set the last time equal to the argument time 
        // this is to start the frames 
        lastTime = time 
        // use the method requestAnimationFrame and pass in the frame function 
        // this tells the browser that there's an animation that needs to stop 
        // it knows this because the frame method would return false 
        requestAnimationFrame(frame)
    }
    // use the method requestAnimationFrame and pass in the frame function to have the animation start 
    // this tells the browser that there's animation 
    requestAnimationFrame(frame)
}

// this method actually runs the level when given a display and level, when its over the game waits a couple seconds and either goes to the next level or restarts 
// create a method runLevel, which has two arguments, level and Display 
function runLevel(level, Display) {
    // create a variable to hold a new Dom display object and pass in the document body and the level
    let display = new Display(document.body, level)
    // create a variable to hold State.start pass in the level to the start method 
    let state = State.start(level)
    // create a variable to hold the number one 
    // this is going to be used later to help with telling if the game is ending
    let ending = 1
    // return a new promise object and pass in a callback into it by using the arrow operator to create a variable resolve
    // when dealing with Asynchronicity promise is essentially a method that within its creation that it would be given everything it needs to return true or else it returns false p
    return new Promise(resolve => {
        // call the runAnimation method and use the arrow operator to make another callback with the variable time 
        runAnimation(time => {
            // set state to state's update method with time and arrowKeys passed in 
            state = state.update(time, arrowKeys)
            // have display call it's syncState method and pass in state
            display.syncState(state)
            // if state's status is equal to "playing"
            if (state.status === "playing"){
                // return true 
                return true
            // else if ending is greater than 0
            }else if (ending > 0){
                // set ending to minus equal time 
                ending -= time 
                // and return true 
                return true 
            // else 
            }else {
                // clear display 
                display.clear()
                // pass in state.status to resolve 
                resolve(state.status)
                // and return false 
                return false 
            }

        })
    })
}

// create an Asynchronous function runGame with two arguments, plans and Display 
// to create an Asynchronous use async before function 
// Asynchronous functions are functions that instead of waiting to for one task to finish before starting the next task, it preforms the next task and comes back to it when it's finished 
// plans are the given level and Display is the dom display object that displays everything 
async function runGame(plans, Display) {
    // for level equals zero, level is less than the plan's length 
    // this checks if there's multiple levels that need to be loaded
    for (let level = 0; level < plans.length;){
        // create a variable to hold runLevel with a new level object passed into it, the level object needs two parameters filled which is a plan so pass in the plans and since plans is an array you need to specify which one and since you have a variable that increases per level use that for specifying which plan
        // also pass in the display as the second parameter
        // because runLevel has a promise attached to it, it needs the await expressing before its called so it waits for the promise to be fulfilled 
        let status = await runLevel(new Level(plans[level]), Display)
        // is the status of the game is "won", increase the level variable 
        if (status ==="won") level++
    }
    // use the console to display "You've won!"
    console.log("You've won!")
    
}


// since you can only manipulate the dom one child at a time you can create a helper method that can speed up the creating time that accepts a name, attributes and children 
function elementHelper(name, attrs, ...children) {
    // create an element and give it name 
    let dom = document.createElement(name)
    // iterate through the attributes, since it'll be a hash you have to look at the keys 
    for (let attr of Object.keys(attrs)){
        // then using the newly created element to set the attributes 
        // note that the setAttribute takes in two parameters, the name of the attribute and what its going to be set to
        dom.setAttribute(attr, attrs[attr])
    }
    // then you can iterate through the given children
    for (let child of children){
        // and append them to the newly created element
        dom.appendChild(child)
    }
    // finally return the element
    return dom
}

