var Bonzai = function() {
    require('require-dir')('./tasks', { recurse: true });
};

Bonzai.config = require('./config');
Bonzai.config.setDefaultsFrom('bonzai.json');

Bonzai.extend = function(name, callback) {
    Bonzai.config[name] = callback;
};

module.exports = Bonzai;
