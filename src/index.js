import React, {Component} from 'react'
import Expression from './Expression'
import math from 'mathjs'
import './index.less'

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
  
  render() {
    return <div className="formulaContainer">
      {this.state.expressionTree && <Expression treeRoot={this.state.expressionTree} />}
    </div>
  }
}
