# eslint-plugin-mongoose-rules

ESLint plugin that checks for common errors when using mongoose.js.
The latest versions of mongoose have removed the old callback api,
and require that ObjectId() is always instantiated with new, whereas
alder versions allowed that style. This plugin can be used to look
for problems with your mongoose usage before upgrading to version 7
or later.

# Installation

```
npm install eslint-plugin-mongoose-rules
```

# Requirements

- Node.js 18 or above
- ESLint 9.x or above

# Rules

- `no-mongoose-callback` - Prevent using the callback api on Model, Query and Document methods
- `new-object-id rule` - Make sure ObjectId is always instantiated with new

# Configuration

Import the plugin into your `eslint.config.js` file and enable both rules with the recommended config:

```js
import js from '@eslint/js';
import mongooseRules from 'eslint-plugin-mongoose-rules';

export default [
    js.configs.recommended,
    mongooseRules.configs.recommended,
    {

```

# License

`eslint-plugin-mongoose-rules` is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
