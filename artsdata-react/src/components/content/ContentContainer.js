import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import KartContainer from '../kart/KartContainer'
import Header from '../header/Header'

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
   * 
   * 
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
   * 
   * 
   * @returns
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
