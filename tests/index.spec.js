import { expect } from 'chai';
import plugin from '../index.js';

describe('eslint-plugin-mongoose-rules', function() {
  it('should export a valid ESLint plugin object', function() {
    expect(plugin).to.be.an('object');
    expect(plugin).to.have.property('rules');
    expect(plugin.rules).to.have.property('no-mongoose-callbacks');
    expect(plugin.rules).to.have.property('no-objectid-without-new');
  });
});
