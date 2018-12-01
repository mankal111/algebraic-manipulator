import React from 'react';
import OperatorExpression from './OperatorExpression';

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
    return (
      <span className="parenthesisExpression">
        <Expression
          treeRoot={node.content}
          path={`${path}.content`}
        />
      </span>
    );
  case 'ConstantNode':
    return <span className="constantExpression">{node.value}</span>;
  case 'SymbolNode':
    return <span className="symbolExpression">{node.name}</span>;
  default:
    return null;
  }
};

export default Expression;
