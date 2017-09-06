# njs-tfso-secret
Get secret values from file

Try to read file and returns content as value. 
Name of file is name of key, file location is determined by config.
 
Note: Reading is sync. Use only on startup.

## install
`npm install tfso/njs-tfso-secret`

## usage
```javascript
const secret = require('njs-tfso-secret');
 
let value = secret.get('some-secret', 'somedefaultvalue');

 
//custom config
secret.config({
    location: '/run/secrets', // default
    silent: false // if false, log to console if error reading keys from file. Default is "true"
});
 

// use together with getenv
const env = require('getenv');

let valueWithDefaultFromEnv = secrets.get('PASSWORD',env.string('PASSWORD', ''))
```
