import React, {Component} from 'react'
import Operator from './Operator'

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
            return <span className="operatorExpression">
              <Expression treeRoot={node.args[0]} />
              <Operator node={node} />
              <Expression treeRoot={node.args[1]} />
            </span>;
      case 'ParenthesisNode':
        return <span className="parenthesisExpression">(<Expression treeRoot={node.content} />)</span>
      case 'ConstantNode':
        return <span className="constantNode">{node.value}</span>;
      case 'SymbolNode':
        return <span className="symbolNode">{node.name}</span>;
    }
  }
}