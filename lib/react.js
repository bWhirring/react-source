import ReactDOM from './react-dom'
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState(state) {
    this.state = Object.assign(this.state, state)
    ReactDOM.renderComponent(this)
  }

}

export default { createElement, Component }