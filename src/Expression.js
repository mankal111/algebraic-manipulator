import React from 'react';
import OperatorExpression from './OperatorExpression';
import ConstantExpression from './ConstantExpression';

export const Expression = ({ treeRoot: node, path }) => {
  switch (node.type) {
  case 'OperatorNode':
    return (
      <OperatorExpression
        node={node}
        path={path}
      />
    );
  case 'ParenthesisNode':
    return node.content.type === 'ConstantNode'
      ? (
        <span className="constantExpression">{node.content.value}</span>
      )
      : (
        <span className="parenthesisExpression">
          (
          <Expression
            treeRoot={node.content}
            path={`${path}.content`}
          />
          )
        </span>
      );
  case 'ConstantNode':
    return (
      <ConstantExpression
        node={node}
        path={path}
      />
    );
  case 'SymbolNode':
    return <span className="symbolExpression">{node.name}</span>;
  default:
    return null;
  }
};

export default Expression;
