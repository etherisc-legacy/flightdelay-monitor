var winston = require('winston');
var fs = require('fs');

network = 'mainnet';
version = '1.0';


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

var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://35.158.95.25:8545"));
//web3.eth.getBlockNumber((err, result) => { console.log(result); });

artifacts = jsonfile => JSON.parse(Assets.getText(jsonfile));

getContract = (contractId, contractName, version, network) => {
  
  	var contractItem = Contracts.findOne({
  			contractId: contractId, 
  			version: version,
  			network: network
		});
  	if (typeof contractItem === 'undefined') return undefined;
	return web3.eth.contract(artifacts('artifacts/' + contractName + '.json').abi).at(contractItem.address);

};

FlightDelayController = getContract('FD.Controller', 'FlightDelayController', version, network);

upsertContract = (contractId, version, network) => {
  
    contract = Meteor.wrapAsync(FlightDelayController.contracts)(contractId);
 
  	Contracts.update(
      {contractId: contractId, version: version, network: network},
      {$set: {address: contract[0], contractId: contractId, version: version, network: network}},
      {upsert: true}
    );
  
}

if (typeof FlightDelayController != 'undefined') {

  	upsertContract('FD.NewPolicy', version, network);
 	upsertContract('FD.Underwrite', version, network);
  	upsertContract('FD.Payout', version, network);
  	upsertContract('FD.AccessController', version, network);
  	upsertContract('FD.Ledger', version, network);
  	upsertContract('FD.Database', version, network);
  	upsertContract('FD.CustomersAdmin', version, network);
  	upsertContract('FD.Emergency', version, network);
  	upsertContract('FD.Owner', version, network);
  	upsertContract('FD.Funder', version, network);
  
}

console.log('Server started');

