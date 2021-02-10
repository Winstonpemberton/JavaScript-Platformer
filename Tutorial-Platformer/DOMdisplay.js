// to start drawing, you're gonna need a dom display class

class DOMdisplay{
    // it needs to be given a parent and level at start
    // the parent element is going to be the tag that the display is going to be created into
    constructor(parent, level) {
        // using the helper method you can set this dom and give it the parameters "div", {class:"game"} and drawGrid method with the level passed into it 
        // div is the parent
        this.dom = elementHelper("div", {class: "game"}, drawGrid(level))
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
    return elementHelper("table", {class: "background", style:`width: ${level.width * scale}px`}, ...level.rows.map(row => elementHelper("tr", {style: `height: ${scale}px`}, ...row.map(type =>("td", {class: type})))
        ))
        
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

