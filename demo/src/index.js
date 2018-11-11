import React, {Component} from 'react'
import {render} from 'react-dom'

import AlgebraicManipulator from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentFormula: ''
    }

    this.formulaChanged = this.formulaChanged.bind(this);
  }

  formulaChanged(newFormula) {
    console.log(newFormula);
    this.setState({componentFormula: newFormula});
  }

  render() {
    const initialFormula="2y + 4x = 5";
    return <div>
      <h1>algebraic-manipulator Demo</h1>
      <div>The formula given to the component is: {initialFormula}</div>
      <AlgebraicManipulator
        formula={initialFormula}
        onFormulaChange={this.formulaChanged}
      />
      <div>The formula returned by the <em>onFormulaChange</em> callback is: {this.state.componentFormula}</div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
