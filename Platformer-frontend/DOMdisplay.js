class DOMdisplay{
    constructor(parent, level){
        this.dom = elementHelper("div",{class:"game"}, drawGrid(level))
        this.actorLayer = null
        parent.appendChild(this.dom)
    }

    clear(){
        this.dom.remove
    }

}
const scale = 20
function drawGrid(level){

    return elementHelper("table", {class:"background", style: `width: ${level.width * scale}px`}, ...level.rows.map(row => elementHelper("tr",{style:`height: ${scale}px`}, ...row.map(type => elementHelper("td", {class: type})))))
}

function drawActors(actors){
    return elementHelper("div", {},...actors.map(actor =>{
      let actorDrawSize = elementHelper("div", {class:`actor ${actor.type}`})

      actorDrawSize.style.width = `${actor.size.x * scale}px`
      actorDrawSize.style.height = `${actor.size.y * scale}px`
      actorDrawSize.style.top = `${actor.position.x * scale}px`
      actorDrawSize.style.left = `${actor.position.y * scale}px`

      return actorDrawSize
    }))

}

DOMdisplay.prototype.syncState = function(state){
    if(this.actorLayer != nil) this.actorLayer.remove()
    this.actorLayer = drawActors(state.actors)
    this.dom.className = `Game: ${state.status}`
}

DOMdisplay.prototype.scrollWithPlayer = function(state){
    let screenHeight = this.dom.clientHeight
    let screenWidth = this.dom.clientWidth 
    let thirdOfWidth = screenWidth/ 3 

    let cameraLeft = this.dom.scrollLeft 
    let cameraRight = cameraLeft + screenWidth
     
    let cameraTop = this.dom.scrollTop
    let cameraBottom = cameraTop + screenWidth 

    let player = state.player()
    let cameraCenter = player.position.times(scale) // if camera doesn't work it's def because of this 

    // center.x = player's x position aka where the player is on the x axis 
    // camera right = camera left aka the scrollLeft of the dom which starts at 0 
    // margin = 1/3 of the width of the screen 
    // center.x > camera right - margin = if the x position of the player is greater than the left most of the screen plus a third of the width of the screen 
    // this.dom.scrollLeft = center.x + third of width of screen - the screen width =
    // set screen scroll to the player's x position + third of width of screen - the screen width
    if(cameraCenter.x < cameraLeft + thirdOfWidth){
        this.dom.scrollLeft = cameraCenter.x - thirdOfWidth
    }else if (cameraCenter.x > cameraRight - thirdOfWidth){
        this.dom.scrollLeft = cameraCenter.x + thirdOfWidth - screenWidth
    }
    if(cameraCenter.y < cameraTop + thirdOfWidth){
        this.dom.scrollTop = cameraCenter.y - thirdOfWidth 
    }else if (cameraCenter > cameraBottom.y - thirdOfWidth){
        this.dom.scrollTop = cameraCenter.y + thirdOfWidth - screenHeight
    }

}

function elementHelper(elementName, attributes, ...children){
    element = document.createElement(elementName)

    for(attr of Object.keys(attributes)){
        element.setAttribute(attr, attributes[attr])
    }

    for(child of children){
        element.appendChild(child)
    }

    return element
}