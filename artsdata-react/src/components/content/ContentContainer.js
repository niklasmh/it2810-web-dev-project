import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import KartContainer from '../kart/KartContainer'
import Header from '../header/Header'

class ContentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: true,
            toggleContainer: <ListeContainer />
        }
    }
    toggleEvent(){
        if(this.state.toggle){
            this.setState({
                toggle: false,
                toggleContainer: <KartContainer />
            })
        }else {
            this.setState({
                toggle: true,
                toggleContainer: <ListeContainer />
            })
        }
    }

    render() {
        return(
          <div>
            <Header toggleHandler={this.toggleEvent.bind(this)} />
            {this.state.toggleContainer}
          </div>
    );
  }
}

export default ContentContainer
