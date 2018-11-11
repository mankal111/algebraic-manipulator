import React, {Component} from 'react'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFormula: '',
      currentFormula: ''
    }
  }

  componentDidMount() {
    this.setState(
      {
        initialFormula: this.props.formula,
        currentFormula: this.props.formula
      },
      () => this.props.onFormulaChange(this.state.currentFormula)
    );
  }

  render() {
    return <div>
      <h2>{this.state.initialFormula}</h2>
    </div>
  }
}
