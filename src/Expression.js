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
          default:
            return <span>*</span>;
        }
      case 'ConstantNode':
        return <span className="constant">{node.value}</span>;
      default:
        return <span>*</span>;
    }
  }
}