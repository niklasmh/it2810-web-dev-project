import React, { Component } from 'react'
import './buttons.css'

class MenuButton extends Component {
  render () {
    return (
      <div>
        <button onClick={this.props.clickHandler} className="buttons">{this.props.btnText}</button>
      </div>
    )
  }
}

export default MenuButton
