import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import KartContainer from '../kart/KartContainer'
import Header from '../header/Header'

/**
 * ContentContainer acts as a placeholder for the rest of the components in the application.
 *
 * @class ContentContainer
 * @extends {Component}
 */
class ContentContainer extends Component {
  /**
   * Creates an instance of ContentContainer.
   *
   * @param {any} props
   *
   * @memberOf ContentContainer
   */
  constructor (props) {
    super(props)
    this.state = {
      toggle: true,
      toggleContainer: <ListeContainer />
    }
  }
  /**
   * ToggleEvent handles the toggleEvent from the child component Header.
   * It toggles the view between the list and the map.
   * If the property toggle is false, the container will show the map,
   * if it is true, the container will show the list.
   *
   * @memberOf ContentContainer
   */
  toggleEvent () {
    if (this.state.toggle) {
      this.setState({
        toggle: false,
        toggleContainer: <KartContainer />
      })
    } else {
      this.setState({
        toggle: true,
        toggleContainer: <ListeContainer />
      })
    }
  }

  /**
   * Displays the div where the list-container (or map-container) will appear in the code.
   *
   * @returns JSX element
   *
   * @memberOf ContentContainer
   */
  render () {
    return (
      <div>
        <Header toggleHandler={this.toggleEvent.bind(this)} />
        {this.state.toggleContainer}
      </div>
    )
  }
}

export default ContentContainer
