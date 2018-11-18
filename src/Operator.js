import React, {Component} from 'react'
import './Operator.less'

export default class Operator extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
  render() {
      const node = this.props.node;
      const opSymbol = node.op === '*' ? '·' : node.op; 
      return <span className={`${node.fn}Operator Operator`} >{opSymbol}</span>
  }
}