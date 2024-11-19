import { noMongooseCallbacks } from './lib/rules/no-mongoose-callbacks.js';
import { noObjectidWithoutNew } from './lib/rules/no-objectid-without-new.js';

const plugin = {
  meta: {
    name: "eslint-plugin-mongoose-rules",
    version: "1.0.0"
  },
  rules: {
    'no-mongoose-callbacks': noMongooseCallbacks,
    'no-objectid-without-new': noObjectidWithoutNew,
  },
  configs: {},
  processors: {}
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    name: 'mongoose-rules/recommended',
    plugins: {
      'mongoose-rules': plugin
    },
    rules: {
      'mongoose-rules/no-mongoose-callbacks': [
        'error'
      ],
      'mongoose-rules/no-objectid-without-new': [
        'error'
      ],
    }
  },
  all: {
    name: 'mongoose-rules/all',
    plugins: {
      'mongoose-rules': plugin
    },
    rules: {
      'mongoose-rules/no-mongoose-callbacks': [
        'error'
      ],
      'mongoose-rules/no-objectid-without-new': [
        'error'
      ],
    }
  }
});

export default plugin;
