import Hu from './react'
/**
 * 
 * @param {*} vnode 
 * @param {Element} container 
 */
function render(vnode, container) {
  container.innerHTML = ''
  _render(vnode, container)
}

function _render(vnode, container) {
  let dom = createDomFromVnode(vnode)
  container.appendChild(dom)
}


function createDomFromVnode(vnode) {
  let { tag, attrs, children } = vnode
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  if (typeof vnode === 'object') {

    if (typeof tag === 'function') {
      let component = createComponent(tag, attrs)
      renderComponent(component)
      return component.$root
    }

    let dom = document.createElement(tag)

    setAttribute(dom, attrs)

    if (children && Array.isArray(children)) {
      children.forEach(node => {
        _render(node, dom)
      })
    }
    return dom
  }
}


function createComponent(constructor, attrs) {
  let component
  if (constructor.prototype instanceof Hu.Component) {
    component = new constructor(attrs)
  } else {
    component = new Hu.Component(attrs)
    component.constructor = constructor
    component.render = function () {
      return this.constructor()
    }
  }

  return component
}

function renderComponent(component) {
  let vdom = component.render()
  let dom = createDomFromVnode(vdom)

  if (component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root)
  }

  component.$root = dom
}

/**
 * 
 * @param {*} dom 
 * @param {Element} attrs
 */
function setAttribute(dom, attrs) {
  for (let i in attrs) {
    let attr = attrs[i]

    if (/^on/.test(i)) {
      dom[i.toLowerCase()] = attr
    } else if (i === 'style') {
      dom = Object.assign(dom.style, attr)
    } else {
      dom[i] = attr
    }
  }
}

export { render, renderComponent }