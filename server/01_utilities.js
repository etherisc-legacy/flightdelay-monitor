var winston = require('winston');
var fs = require('fs');

network = 'mainnet';
version = '1.0';
contractsInitialized = false;

var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://35.158.95.25:8545"));
//web3.eth.getBlockNumber((err, result) => { console.log(result); });




String.prototype.padLeft = function (length) {
        var pad = ' '.repeat(length);
        return String(pad + this).slice(-length);
};

String.prototype.padRight = function(l,c) {
  return this+Array(Math.max(0, l-this.length+1)).join(c||" ");};

ServerLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'Server.log',
      json: false,
      timestamp: function() {
        return new Date().toISOString();
      },
      formatter: function(options) {
        // Options object will be passed to the format function. 
        // It's general properties are: 
        //		timestamp, 
        //		level, 
        //		message, 
        //		meta. 
        // Depending on the transport type may be additional properties.
        // Return string will be passed to logger.
        var levelString = options.level.toUpperCase().padRight(10);
        return options.timestamp() + 
          ' ' + 
          levelString +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '' );
      }})
   ]
});


