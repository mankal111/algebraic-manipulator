import React, {Component} from 'react'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFormula: '',
      currentFormula: ''
    }
  }

  componentWillMount() {
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
      <h2>{this.state.currentFormula}</h2>
    </div>
  }
}
