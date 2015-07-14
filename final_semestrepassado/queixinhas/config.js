var configs = {
    "development": {
        getConnString: function()
        {
            return "postgres://queixinhauser:queixinhas2015@localhost/queixinhadb";
        },
		getEmailInfo: function()
		{
			return {
				service: 'Gmail',
				auth: {
					user: 'pi1415i.li51d.g13@gmail.com ',
					pass: 'queixinha'
				}
			}
		}
    }
}

var config = configs[process.env.NODE_ENV] || configs["development"];

console.log("using config", config);


module.exports = config;
