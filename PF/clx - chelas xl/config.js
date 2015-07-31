var configs = {
    "development": {
        getConnString: function () {
            return "postgres://ClxSuperUser:clx@localhost/PF - PI";
        },
        "getEmailInfo": function () {
            return {
                service: 'yahoo',
                auth: {
                    user: 'grupo_18@yahoo.com ',
                    pass: 'pi1415sv'
                }
            }
        }
    }
}

var config = configs[process.env.NODE_ENV] || configs["development"];

console.log("using config", config);

module.exports = config;
