export default {
  OperatorNode: [
    { title: 'Evaluate', id: 'Evaluate' },
    { title: 'Commutate', id: 'Commutate' },
    {
      title: 'Associative',
      id: 'Associative',
      submenuStructure: [
        {
          type: 'menuItem',
          text: '$a#Op#(b#op#c)\\rightarrow(a#Op#b)#op#c$',
          triggerAction: true,
          value: 'right',
        },
        {
          type: 'menuItem',
          text: '$(a#op#b)#Op#c \\rightarrow a#op#(b#Op#c)$',
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
        { type: 'text', content: '·' },
        { type: 'input' },
        { type: 'button', text: 'split', triggerAction: true },
      ],
    },
  ],
};
