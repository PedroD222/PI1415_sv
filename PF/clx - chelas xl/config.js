var configs = {
    "development": {
        getConnString: function()
        {
            return "postgres://ClxSuperUser:clx@localhost/PF - PI";
        }
    }
}

var config = configs[process.env.NODE_ENV] || configs["development"];

console.log("using config", config);

module.exports = config;
