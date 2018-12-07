import React, { Component } from 'react';
import { render } from 'react-dom';
import math from 'mathjs';
import './index.less';

import AlgebraicManipulator from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    const initialInput = '2x + (4 + 3y)';
    this.state = {
      input: initialInput,
      callbackExpression: '',
      componentExpression: initialInput,
      errorMessage: null,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.ExpressionChanged = this.ExpressionChanged.bind(this);
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
    try {
      math.parse(event.target.value);
      this.setState({ errorMessage: null });
      this.setState({ componentExpression: event.target.value });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  }

  ExpressionChanged(newExpression) {
    this.setState({ callbackExpression: newExpression });
  }

  errorComponent() {
    const { errorMessage } = this.state;
    return errorMessage && (
      <div className="errorContainer">
        <div>{`There is an error in the given expression: "${errorMessage}".`}</div>
        <div>The expression parsing errors are not being catched by the component.</div>
        <div>The host application should take care of the correctness of the expression.</div>
        <div>Showing the latest correct expression:</div>
      </div>
    );
  }


  render() {
    const { input, componentExpression, callbackExpression } = this.state;
    return (
      <div>
        <h1>algebraic-manipulator Demo</h1>
        <div>
          The Expression given to the component is:
          <input type="text" value={input} onChange={this.onInputChange} />
        </div>
        { this.errorComponent() }
        <AlgebraicManipulator
          expression={componentExpression}
          onExpressionChange={this.ExpressionChanged}
        />
        <div>
          The Expression returned by the
          <em> onExpressionChange </em>
          callback is:
          {callbackExpression}
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
