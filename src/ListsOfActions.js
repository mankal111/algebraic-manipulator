export default {
  OperatorNode: [
    { title: 'Evaluate', id: 'Evaluate' },
    { title: 'Commutate', id: 'Commutate' },
    {
      title: 'Associative',
      id: 'Associative',
      submenuStructure: [
        {
          type: 'button',
          text: 'a*(b*c) => (a*b)*c',
          triggerAction: true,
          value: 'right',
        },
        {
          type: 'button',
          text: '(a*b)*c => a*(b*c)',
          triggerAction: true,
          value: 'left',
        },
      ],
    },
  ],
  ConstantNode: [
    {
      title: 'Split To Sum',
      id: 'SplitToSum',
      inputsRelation: (constant, input) => constant - input,
      submenuStructure: [
        { type: 'input' },
        { type: 'text', content: '+' },
        { type: 'input' },
        { type: 'button', text: 'split', triggerAction: true },
      ],
    },
    {
      title: 'Split To Product',
      id: 'SplitToProduct',
      inputsRelation: (constant, input) => constant / input,
      submenuStructure: [
        { type: 'input' },
        { type: 'text', content: 'X' },
        { type: 'input' },
        { type: 'button', text: 'split', triggerAction: true },
      ],
    },
  ],
};
