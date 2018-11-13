import React, {Component} from 'react'
import {render} from 'react-dom'

import AlgebraicManipulator from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentFormula: '',
      initialFormula: "2y + 4x = 5"
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.formulaChanged = this.formulaChanged.bind(this);
  }

  formulaChanged(newFormula) {
    this.setState({ componentFormula: newFormula });
  }

  onInputChange(event) {
    this.setState({ initialFormula: event.target.value });
  }

  render() {
    return <div>
      <h1>algebraic-manipulator Demo</h1>
      <div>The formula given to the component is: 
        <input type="text" value={this.state.initialFormula} onChange={this.onInputChange}/>
      </div>
      <AlgebraicManipulator
        formula={this.state.initialFormula}
        onFormulaChange={this.formulaChanged}
      />
      <div>The formula returned by the <em>onFormulaChange</em> callback is: {this.state.componentFormula}</div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
