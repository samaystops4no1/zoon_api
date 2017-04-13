// JavaScript source code
exports.version = "0.0.1";
var winston = require('winston');

if(process.env.NODE_ENV=='development')
{
exports.logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true
        })]
});
}
else{
exports.logger={"info":function(string){},
                "error":function(string){},
				"warn":function(string){}
				};
}
