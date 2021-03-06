class DOMdisplay{
    constructor(parent, level){
        this.dom = elementHelper("div",{class:"game"}, drawGrid(level))

    }

}
const scale = 20
function drawGrid(level){
    let drawnGrid = elementHelper("table", {class:"background", style:`width ${level.width * scale}px`}, level.rows.map(row => elementHelper("tr",{style:`height ${level.height * scale}px`}, row.map(type => elementHelper("td", {class: type})))))
    return drawnGrid
    
}

function elementHelper(elementName, attributes, ...children){
    element = document.createElement(elementName)

    for(attr in Object.keys(attributes)){
        element.setAttributes(attr, attributes[attr])
    }

    for(child in children){
        element.appendChild(child)
    }

    return element
}