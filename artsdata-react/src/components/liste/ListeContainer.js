import React, { Component } from 'react'
import ListeElement from './ListeElement'
import ListeSearch from './ListeSearch'
import ListeFilter from './ListeFilter'
import './ListeContainer.css'

/**
 * ListeContainer fetches information from an open API and displays the information in an array of ListeElements components.
 *
 * @class ListeContainer
 * @extends {Component}
 */
class ListeContainer extends Component {
  /**
   * Creates an instance of ListeContainer.
   *
   * @param {any} props
   *
   * @memberOf ListeContainer
   */
  constructor (props) {
    super(props)
  }



  /**
   * Displays the filtererd data in an array.
   *
   * @returns JSX element
   *
   * @memberOf ListeContainer
   */
  render () {
    console.log('render');
    var rows = []

    for (var i = 0; i < this.props.data.length; i++) {
      rows.push(<ListeElement data={this.props.data[i]} id={'element-' + i} key={i} />)

    }
    return (
      <div className="listview">
        <div>
          {rows}
        </div>
      </div>
    )
  }
}

export default ListeContainer
