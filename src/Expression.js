import React, {Component} from 'react'
import OperatorExpression from './OperatorExpression'

export default class Expression extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
  render() {
    const node = this.props.treeRoot;
    switch (node.type) {
      case 'OperatorNode':
            return <OperatorExpression
              node={node}
              path={this.props.path}
              selectNode={this.props.selectNode}
              selectedNodePath={this.props.selectedNodePath}
            />;
      case 'ParenthesisNode':
        return <span className="parenthesisExpression">
            (<Expression
              treeRoot={node.content}
              path={this.props.path + '.content'}
              selectNode={this.props.selectNode}
              selectedNodePath={this.props.selectedNodePath}
            />)
          </span>
      case 'ConstantNode':
        return <span className="constantNode">{node.value}</span>;
      case 'SymbolNode':
        return <span className="symbolNode">{node.name}</span>;
    }
  }
}