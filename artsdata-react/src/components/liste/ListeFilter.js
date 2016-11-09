import React, { Component } from 'react'

class ListeFilter extends Component {

  render () {
    let choices = []
    for (var i = 0; i < this.props.data.length; i++) {
      choices.push(
        <div key={i}>
          <input id={'filter-' + this.props.data[i]} type="checkbox" name={this.props.title} onClick={this.props.filterHandler} value={this.props.data[i]} key={i} />
          <label htmlFor={'filter-' + this.props.data[i]}>{this.props.data[i]}</label>
        </div>
      )
    }


    return(
      <div>
        <h3>Filtrer etter {this.props.title}</h3>
        <div>
          {choices}
        </div>
      </div>
    )
  }
}

export default ListeFilter
