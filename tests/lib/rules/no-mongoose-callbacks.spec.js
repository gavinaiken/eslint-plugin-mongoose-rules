import { RuleTester } from 'eslint';
import { noMongooseCallbacks } from '../../../lib/rules/no-mongoose-callbacks.js';

const ruleTester = new RuleTester();

describe('eslint-plugin-mongoose-rules', function() {
  describe('no-mongoose-callback rule', function() {
    ruleTester.run('no-mongoose-callback', noMongooseCallbacks, {
      valid: [
        // Test cases that should pass
        'Model.find().exec()',
        'Model.findOne().then(result => {})',
        'await Model.findById(id)',
        'Model.update({}, { $set: { field: value } })',
        'someOtherFunction((err, result) => {})',
        "array.find(item => item.id === 5)",
        "[1, 2, 3].find((num) => num > 2)",
        "existingDevices.find(d => d.index === change.index && d.enabled === false)",
        "obj.someArray.find(item => item.property === value)",
        "getArray().find(x => x > 10)",
        "(function() { return [1,2,3]; })().find(x => x > 2)",
        "Array(5).fill(0).find(x => x !== 0)",
      ],
      invalid: [
        // Test cases that should fail
        {
          code: 'Model.find({}, (err, docs) => {})',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
        {
          code: 'Model.find({}, callback)',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
        {
          code: 'Model.findOne({ _id: id }, function(err, doc) {})',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
        {
          code: 'Model.findById(id, (err, doc) => {})',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
        {
          code: 'doc.save((err) => {})',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
        {
          code: 'Model.updateMany({}, { $set: { field: value } }, (err) => {})',
          errors: [{ message: 'Avoid using Mongoose callback API. Use Promises or async/await instead.' }],
        },
      ],
    });
  });
});
