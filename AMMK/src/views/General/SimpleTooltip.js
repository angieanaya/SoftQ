import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { FRONT_BASE_URL } from 'index';

class SimpleTooltip extends Component {
  state = {isOpen: false};

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render () {
    
    return <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
  }
}

export default SimpleTooltip;