export const noObjectidWithoutNew = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce using 'new' keyword with ObjectId constructor",
      recommended: true,
    },
    fixable: "code",
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === 'ObjectId' && node.callee.type === 'Identifier') {
          if (node.parent.type !== 'NewExpression') {
            context.report({
              node,
              message: "ObjectId is a constructor and should be called with 'new'",
              fix: function(fixer) {
                return fixer.insertTextBefore(node, 'new ');
              }
            });
          }
        }
      }
    };
  }
};
