import _ from 'lodash';
import math from 'mathjs';

export const getTrimmedPath = path => path.replace(/Root?./, '');

export const performActionOnTree = (state, actionName) => {
  const newTree = state.expressionTree.cloneDeep();
  const selectedPath = getTrimmedPath(state.selectedExpressionPath);
  const selectedNode = state.selectedExpressionNode;
  let newNode = selectedNode;
  switch (actionName) {
  case 'commutate':
    // mathjs creates a subtraction operation,
    // which causes problem in operation commutation (1-2=2-1)
    // so if the operation is subtraction, we turn it to addition
    // and negate the second operant before the commutation
    if (selectedNode.fn === 'subtract') {
      if (selectedNode.args[1].type === 'ConstantNode') {
        selectedNode.args[1] = new math.expression.node.ConstantNode(-selectedNode.args[1].value);
      }
      newNode = new math.expression.node.OperatorNode(
        '+',
        'add',
        [selectedNode.args[1], selectedNode.args[0]],
      );
    } else {
      newNode = new math.expression.node.OperatorNode(
        selectedNode.op,
        selectedNode.fn,
        [selectedNode.args[1], selectedNode.args[0]],
      );
    }
    break;
  case 'evaluate':
    newNode = new math.expression.node.ConstantNode(selectedNode.eval());
    break;
  default:
    break;
  }
  return {
    expressionTree: selectedPath === '' ? newNode
      : _.set(
        newTree,
        selectedPath,
        newNode,
      ),
    selectedExpressionNode: newNode,
  };
};
