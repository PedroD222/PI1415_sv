var configs = {
    "development": {
        getConnString: function()
        {
            return "postgres://queixinhauser:queixinhas2015@localhost/queixinhadb";
        }
    }
}

var config = configs[process.env.NODE_ENV] || configs["development"];

console.log("using config", config);

module.exports = config;
