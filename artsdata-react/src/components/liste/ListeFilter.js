import React, { Component } from 'react'

class ListeFilter extends Component {

  render () {
    let choices = []
    for (var i = 0; i < this.props.data.length; i++) {
      choices.push(<div key={i}><input type="checkbox" name={this.props.title} onClick={this.props.filterHandler} value={this.props.data[i]} key={i} />{this.props.data[i]}</div>)
    }


    return(
      <div>
        {this.props.title}:
        <label>
          {choices}
        </label>
      </div>
    )
  }
}

export default ListeFilter
