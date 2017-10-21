var winston = require('winston');
var fs = require('fs');

var network = 'mainnet';
var version = '1.0';


String.prototype.padLeft = function (length) {
        var pad = ' '.repeat(length);
        return String(pad + this).slice(-length);
};

String.prototype.padRight = function(l,c) {
  return this+Array(Math.max(0, l-this.length+1)).join(c||" ");};

var ServerLogger = new (winston.Logger)({
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

web3 = new Web3(new Web3.providers.HttpProvider("http:/35.158.95.25:8545"));

artifacts = jsonfile => JSON.parse(Assets.getText(jsonfile));

getContract = (contractId, version, network) => {
  
  	var contractItem = Contracts.findOne({
  			contractId: contractId, 
  			version: version,
  			network: network
		});
  	if (typeof contractItem === 'undefined') return undefined;
	return web3.eth.contract(artifacts('artifacts/' + contractId + '.json').abi).at(contractItem.address);

};


FlightDelayNewPolicy 		= getContract('FlightDelayNewPolicy', version, network);
FlightDelayUnderwrite 		= getContract('FlightDelayUnderwrite', version, network);
FlightDelayPayout 			= getContract('FlightDelayPayout', version, network);
FlightDelayController 		= getContract('FlightDelayController', version, network);
FlightDelayAccessController = getContract('FlightDelayAccessController', version, network);
FlightDelayLedger 			= getContract('FlightDelayLedger', version, network);
FlightDelayDatabase 		= getContract('FlightDelayDatabase', version, network);

/*
console.log('Server started');

var policyCount = FD.getPolicyCount();

var statusToString = function (status) {
        var sts = {
                0 : "Applied",
                1 : "Accepted",
                2 : "Revoked",
                3 : "Paid Out",
                4 : "Expired",
                5 : "Declined"
        };
        return sts[status];
};

var policyFormatterLong = function (policyId, policy, risk) {
	if (!Policies.findOne({id:policyId})) {
        Policies.insert({ 
                id: policyId,
                customer: policy[0], 
                state: statusToString(policy[6].toNumber()), 
                premium: web3.fromWei(policy[1]).toFixed(2),
                riskId: policy[2],
                weight: policy[3].toFixed(0),
                calculatedPayout: web3.fromWei(policy[4]).toFixed(2), 
                actualPayout: web3.fromWei(policy[5]).toFixed(2),
                stateTime: new Date(policy[7].toNumber() * 1000).toLocaleString('de'),
				stateMessage: policy[8].toNumber()
        });
	}

    if (!Risks.findOne({riskId: policy[2]})) {
		Risks.insert({
          riskId: policy[2],
          carrierFlightNumber: risk[0],
          departureYearMonthDay: risk[1],
          arrivalTime: new Date(risk[2].toNumber() * 1000).toLocaleString('de'), 
          delayInMinutes: risk[3].toNumber(),
          delay: risk[4].toNumber(),
          cumulatedWeightedPremium: web3.fromWei(risk[5]).toFixed(2),
          premiumMultiplier: risk[6].toFixed(2)
        });
	}
  
};

Policies.remove({});

for (var id = 0; id < policyCount; id++) {
	try {
		if (!Policies.findOne({id: id})) {
          console.log(id);
          var policy = Meteor.wrapAsync(FD.policies)(id);
          var risk = Meteor.wrapAsync(FD.risks)(policy[2]);
          policyFormatterLong(id, policy, risk);
        }
	} catch (e) {
		console.log(e);
		break;
	}
}

Ledger.remove({});
Ledger.insert({
	account: 0,
	balance: web3.fromWei(FD.ledger(0)).toFixed(4),
	description: 'Premiums'
});

Ledger.insert({
	account: 1,
	balance: web3.fromWei(FD.ledger(1)).toFixed(4),
	description: 'Risk Fund'
});

Ledger.insert({
	account: 2,
	balance: web3.fromWei(FD.ledger(2)).toFixed(4),
	description: 'Payouts'
});

Ledger.insert({
	account: 3,
	description: 'Balance',
	balance: web3.fromWei(FD.ledger(3)).toFixed(4)
});

Ledger.insert({
	account: 4,
	description: 'Reward',
	balance: web3.fromWei(FD.ledger(4)).toFixed(4)
});

Ledger.insert({
	account: 5,
	description: 'OraclizeCosts',
	balance: web3.fromWei(FD.ledger(5)).toFixed(4)
});

Ledger.insert({
	account: 6,
	description: 'Contract Balance',
	balance: web3.fromWei(web3.eth.getBalance(contract_address)).toFixed(4)
});

*/
