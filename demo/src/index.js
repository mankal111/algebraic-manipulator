import React, { Component } from 'react';
import { render } from 'react-dom';
import math from 'mathjs';

import AlgebraicManipulator from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentExpression: '',
      initialExpression: '2x + (4 + 3y)',
      errorMessage: null,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.ExpressionChanged = this.ExpressionChanged.bind(this);
  }

  onInputChange(event) {
    this.setState({ initialExpression: event.target.value });
    try {
      math.parse(event.target.value);
      this.setState({ errorMessage: null });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  }

  ExpressionChanged(newExpression) {
    this.setState({ componentExpression: newExpression });
  }

  errorComponent() {
    const { errorMessage } = this.state;
    return errorMessage && (
      <div className="errorContainer">
        <div>{`There is an error in the given expression: ${errorMessage}.`}</div>
        <div>Showing the latest correct expression:</div>
      </div>
    );
  }


  render() {
    const { initialExpression, componentExpression } = this.state;
    return (
      <div>
        <h1>algebraic-manipulator Demo</h1>
        <div>
          The Expression given to the component is:
          <input type="text" value={initialExpression} onChange={this.onInputChange} />
        </div>
        <AlgebraicManipulator
          expression={initialExpression}
          onExpressionChange={this.ExpressionChanged}
        />
        <div>
          The Expression returned by the
          <em> onExpressionChange </em>
          callback is:
          {componentExpression}
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
