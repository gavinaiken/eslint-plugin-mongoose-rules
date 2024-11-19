import { RuleTester } from 'eslint';
import { noObjectidWithoutNew } from '../../../lib/rules/no-objectid-without-new.js';

const ruleTester = new RuleTester();

describe('eslint-plugin-mongoose-rules', function() {
  describe("new-object-id rule", function() {
    ruleTester.run("new-object-id", noObjectidWithoutNew, {
      valid: [
        "new ObjectId()",
        "new ObjectId('507f1f77bcf86cd799439011')",
        "someOtherFunction()",
      ],
      invalid: [
        {
          code: "ObjectId()",
          errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
          output: "new ObjectId()",
        },
        // TODO!
        // {
        //   code: "mongoose.Types.ObjectId()",
        //   errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
        //   output: "new mongoose.Types.ObjectId()",
        // },
        {
          code: "ObjectId('507f1f77bcf86cd799439011')",
          errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
          output: "new ObjectId('507f1f77bcf86cd799439011')",
        },
        {
          code: "const id = ObjectId();",
          errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
          output: "const id = new ObjectId();",
        },
        {
          code: "const oids = ids.map(id => ObjectId(id));",
          errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
          output: "const oids = ids.map(id => new ObjectId(id));",
        },
        {
          code: "const obj = { _id: ObjectId(), foo: 'bar' };",
          errors: [{ message: "ObjectId is a constructor and should be called with 'new'" }],
          output: "const obj = { _id: new ObjectId(), foo: 'bar' };",
        },
      ],
    });
  });
});
