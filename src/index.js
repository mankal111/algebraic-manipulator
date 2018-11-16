import React, {Component} from 'react'
import math from 'mathjs'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFormula: '',
      currentFormula: ''
    }
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (this.props.formula !== prevProps.formula) {
      this.initialize();
    }
  }

  initialize() {
    this.setState(
      {
        initialFormula: this.props.formula,
        currentFormula: this.props.formula,
        expressionTree: math.parse(this.props.formula)
      },
      () => this.props.onFormulaChange(this.state.currentFormula)
    );
  }

  convertNodeToElement(node) {
    switch (node.type) {
      case 'OperatorNode':
        switch (node.op) {
          case '+':
            return <span className="operatorExpression">
              {this.convertNodeToElement(node.args[0])}<span className="addOperator">+</span>{this.convertNodeToElement(node.args[1])}
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
  
  render() {
    return <div className="formulaContainer">
      {this.state.expressionTree && this.convertNodeToElement(this.state.expressionTree)}
    </div>
  }
}
