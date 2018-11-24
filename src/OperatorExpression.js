import {connect} from 'react-redux';
import {setSelectedExpressionPath} from './actions/expressionActions';
import React, {Component} from 'react'
import Expression from './Expression'
import './OperatorExpression.less'

export class OperatorExpression extends Component {

  render() {
      const node = this.props.node;
      const opSymbol = node.op === '*' ? '·' : node.op; 
      const isSelected = this.props.selectedExpressionPath === this.props.path;
      return <span className={`operatorExpression ${isSelected ? 'focus' : ''}`}>
        <Expression
          treeRoot={node.args[0]}
          path={this.props.path + '.args[0]'}
          selectNode={this.props.selectNode}
          selectedNodePath={this.props.selectedNodePath}
        />
        <span
          className={`${node.fn}Operator operator`}
          onClick={this.props.selectExpression}
        >
          {opSymbol}
        </span>
        <Expression
          treeRoot={node.args[1]}
          path={this.props.path + '.args[1]'}
          selectNode={this.props.selectNode}
          selectedNodePath={this.props.selectedNodePath}
        />
      </span>;
  }
}



const mapStateToProps = state => {
  return {
    selectedExpressionPath: state.expression.selectedExpressionPath
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectExpression: () => dispatch(setSelectedExpressionPath(ownProps.path)) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorExpression)