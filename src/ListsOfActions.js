export const actionsForOperator = [
  { title: 'Evaluate', id: 'Evaluate' },
  { title: 'Commutate', id: 'Commutate' },
  { title: 'Associative', id: 'Associative' },
];

export const actionsForConstant = [
  { title: 'Split To Sum', id: 'SplitToSum', inputsRelation: (constant, input) => constant - input },
  { title: 'Split To Product', id: 'SplitToProduct', inputsRelation: (constant, input) => constant / input },
];
