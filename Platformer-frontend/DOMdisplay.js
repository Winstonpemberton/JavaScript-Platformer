class DOMdisplay{
    constructor(parent, level){
        this.dom = elementHelper("div",{class:"game"}, drawGrid(level))

    }

}
const scale = 20
function drawGrid(level){
    return elementHelper("table", {class:"background", style:`width ${level.width * scale}px`}, level.rows.map(row => elementHelper("tr",{style:`height ${scale}px`}, row.map(type => elementHelper("td", {class: type})))))

    
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