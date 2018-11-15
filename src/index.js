import React, {Component} from 'react'

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
        currentFormula: this.props.formula
      },
      () => this.props.onFormulaChange(this.state.currentFormula)
    );
  }
  
  render() {
    return <div className="formulaContainer">
      <h2>{this.state.currentFormula}</h2>
    </div>
  }
}
