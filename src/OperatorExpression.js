import React, {Component} from 'react'
import Expression from './Expression'
import './OperatorExpression.less'

export default class OperatorExpression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({focus: !this.state.focus});
  }

  render() {
      const node = this.props.node;
      const opSymbol = node.op === '*' ? '·' : node.op; 

      return <span className={`operatorExpression ${this.state.focus ? 'focus' : ''}`}>
        <Expression treeRoot={node.args[0]} />
        <span
          className={`${node.fn}Operator operator`}
          onClick={this.handleClick}
        >
          {opSymbol}
        </span>
        <Expression treeRoot={node.args[1]} />
      </span>;
  }
}