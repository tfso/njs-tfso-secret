const fs = require('fs');
const path = require('path');

class Secret {
    constructor(config) {
        this._secrets = {};
        this.config(config);
    }

    config(config) {
        this._config = Object.assign(this._config || {},config);
    }

    read(key) {
        let fullPath = path.join(this._config.location,key),
            value = null;
        try {
            this._secrets[key] = value = fs.readFileSync(fullPath,'utf8');
        } catch(ex) {
            if ( !this._config.silent )
                console.log(`secret: unable to read key ${key} from file ${fullPath}`);
        }
        return value;
    }

    get(key, defaultValue=null) {
        let value;
        if ( !!(value = this._secrets[key]))
            return value;
        value = this.read(key);
        return  !!value ? value : defaultValue;
    }
}


module.exports = (config=>{
    let secret = new Secret(config);
    return {
       config: secret.config.bind(secret),
       get: secret.get.bind(secret)
    };
})({location:'/run/secrets', silent: true});