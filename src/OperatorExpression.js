import React, {Component} from 'react'
import Expression from './Expression'
import './OperatorExpression.less'

export default class OperatorExpression extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({focus: !this.state.focus});
    this.props.selectNode(this.props.path);
  }

  render() {
      const node = this.props.node;
      const opSymbol = node.op === '*' ? '·' : node.op; 
      const isSelected = this.props.selectedNodePath === this.props.path;
      return <span className={`operatorExpression ${isSelected ? 'focus' : ''}`}>
        <Expression
          treeRoot={node.args[0]}
          path={this.props.path + '.args[0]'}
          selectNode={this.props.selectNode}
          selectedNodePath={this.props.selectedNodePath}
        />
        <span
          className={`${node.fn}Operator operator`}
          onClick={this.handleClick}
        >
          {opSymbol}
        </span>
        <Expression
          treeRoot={node.args[1]}
          path={this.props.path + '.args[1]'}
          selectNode={this.props.selectNode}
          selectedNodePath={this.props.selectedNodePath}
        />
      </span>;
  }
}