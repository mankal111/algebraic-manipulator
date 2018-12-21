import _ from 'lodash';
import math from 'mathjs';

export const getTrimmedPath = path => path.replace(/Root?./, '');

export const convertSubToAdd = (node) => {
  let convertedNode = node.cloneDeep();
  if (convertedNode.args[1].type === 'ConstantNode') {
    convertedNode.args[1] = new math.expression.node.ConstantNode(-convertedNode.args[1].value);
  }
  convertedNode = new math.expression.node.OperatorNode(
    '+',
    'add',
    [convertedNode.args[0], convertedNode.args[1]],
  );
  return convertedNode;
};

export const performActionOnTree = (state, actionName) => {
  const newTree = state.expressionTree.cloneDeep();
  const selectedPath = getTrimmedPath(state.selectedExpressionPath);
  const selectedNode = state.selectedExpressionNode;
  let newNode = selectedNode.cloneDeep();
  switch (actionName) {
  case 'Commutate':
    // mathjs creates a subtraction operation,
    // which causes problem in operation commutation (1-2=2-1)
    // so if the operation is subtraction, we turn it to addition
    // and negate the second operant before the commutation
    if (selectedNode.fn === 'subtract') {
      newNode = convertSubToAdd(selectedNode);
    }
    newNode = new math.expression.node.OperatorNode(
      newNode.op,
      newNode.fn,
      [newNode.args[1], newNode.args[0]],
    );
    break;
  case 'Evaluate':
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
