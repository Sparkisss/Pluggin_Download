//всплываюзее окно с ошибками
let tooltipElem: any;

document.onmouseover = function(e) {
    let tooltipHTML;
    let target = e.target as HTMLElement;
    if (target instanceof HTMLElement) {
        tooltipHTML = target.dataset.tooltip;
    }
    if(!tooltipHTML) return
    tooltipElem = document.createElement('div')
    tooltipElem.className = "tooltip"
    tooltipElem.innerHTML = tooltipHTML
    document.body.appendChild(tooltipElem)

    let coords = target.getBoundingClientRect()
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2
    if(left < 0) left = 0

    let top = coords.top - tooltipElem.offsetHeight - 5
    if(top < 0) top = coords.top + target.offsetHeight + 5

    tooltipElem.style.left = left + 'px'
    tooltipElem.style.top = top + 'px'
}

document.onmouseout = function(e) {
    if(tooltipElem) {
        tooltipElem.remove()
        tooltipElem = null
    }
}