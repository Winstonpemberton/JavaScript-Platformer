class DOMdisplay{
    constructor(parent, level){
        this.dom = elementHelper("div",{class:"game"}, drawGrid(level))

        parent.appendChild(this.dom)

    }

}
const scale = 20
function drawGrid(level){
    drawActors(level.actors)
    return elementHelper("table", {class:"background", style: `width: ${level.width * scale}px`}, ...level.rows.map(row => elementHelper("tr",{style:`height: ${scale}px`}, ...row.map(type => elementHelper("td", {class: type})))))
}

function drawActors(actors){
    return elementHelper("div", {},...actors.map(actor =>{
      let actorDrawSize = elementHelper("div", {class:`actor ${actor.type}`})

      actorDrawSize.style.width = `${actor.size.x * scale}px`
      actorDrawSize.style.height = `${actor.size.y * scale}px`
      actorDrawSize.style.top = `${actor.size.x * scale}px`
      actorDrawSize.style.left = `${actor.size.y * scale}px`

      return actorDrawSize
    }))

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