import React, { Component } from 'react'

const MenuButton = ({ btnText }) => {

  let clickHandler = () => {
    console.log(btnText)
  }

  return (
    <div>
      <button onClick={ clickHandler }>{{ btnText }}</button>
    </div>
  )
}

export default MenuButton
