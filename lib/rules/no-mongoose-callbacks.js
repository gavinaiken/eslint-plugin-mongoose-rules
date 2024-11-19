export const noMongooseCallbacks = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce no use of the Mongoose callback API",
      recommended: true,
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        // console.log(node, isMongooseMethod(node))
        if (isMongooseMethod(node) && !isArrayFind(node)) {
          const args = node.arguments;
          const lastArg = args[args.length - 1];
          if (!lastArg) {
            return;
          }
          
          // console.log(lastArg)
          const isFunction = [ 'ArrowFunctionExpression', 'FunctionExpression' ].includes(lastArg.type);
          const isCallbackIdentifier = lastArg.type === 'Identifier' && [ 'callback', 'cb', 'next' ].includes(lastArg.name);
          if (isFunction || isCallbackIdentifier) {
            context.report({
              node: lastArg,
              message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.'
            });
          }
        }
      }
    };
  }
};

// List of common Mongoose methods that accept callbacks
const mongooseMethods = [ 'save', 'aggregate', 'bulkWrite', 'cleanIndexes', 'countDocuments', 'create', 'createCollection',
 'createIndexes', 'deleteOne', 'deleteMany', 'distinct', 'ensureIndexes', 'estimatedDocumentCount', 'exec', 'exists',
 'find', 'findById', 'findByIdAndUpdate', 'findByIdAndReplace', 'findOne', 'findOneAndDelete', 'findOneAndUpdate',
 'findOneAndRemove', 'insertMany', 'listIndexes', 'replaceOne', 'syncIndexes', 'updateMany', 'updateOne', 'validate' ];

function isMongooseMethod(node) {
  if (node.callee.type === 'MemberExpression') {
    const methodName = node.callee.property.name;
    return mongooseMethods.includes(methodName);
  }
  
  return false;
}

function isArrayFind(node) {
  if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'find') {
    const object = node.callee.object;
    const objectName = object.name;
    if (objectName && objectName[0] === objectName[0].toUpperCase()) {
      return false;
    }
    
    // Handle array literals, e.g., [1, 2, 3].find(...)
    if (object.type === 'ArrayExpression') {
      return true;
    }
    
    // Handle other likely array scenarios
    return object.type === 'Identifier' || 
           object.type === 'MemberExpression' ||
           object.type === 'CallExpression';
  }
  return false;
}
