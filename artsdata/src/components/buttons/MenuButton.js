import React, { Component } from 'react'

class MenuButton extends Component {
  render() {
    return (
      <div>
        <button onClick={ this.props.clickHandler }>{ this.props.btnText }</button>
      </div>
    )
  }
}

export default MenuButton
