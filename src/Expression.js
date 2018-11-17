import React, {Component} from 'react'

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
        switch (node.op) {
          case '+':
            return <span className="operatorExpression">
              <Expression treeRoot={node.args[0]} />
              <span className="addOperator">+</span>
              <Expression treeRoot={node.args[1]} />
            </span>;
          case '-':
            return <span className="operatorExpression">
              <Expression treeRoot={node.args[0]} />
              <span className="subOperator">-</span>
              <Expression treeRoot={node.args[1]} />
            </span>;
          case '*':
            return <span className="operatorExpression">
              <Expression treeRoot={node.args[0]} />
              <span className="multiplyOperator">·</span>
              <Expression treeRoot={node.args[1]} />
            </span>;
        }
      case 'ParenthesisNode':
        return <span className="parenthesisExpression">(<Expression treeRoot={node.content} />)</span>
      case 'ConstantNode':
        return <span className="constantNode">{node.value}</span>;
      case 'SymbolNode':
        return <span className="symbolNode">{node.name}</span>;
    }
  }
}