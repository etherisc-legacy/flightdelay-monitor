

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

upsertContract = (contractId, version, network) => {
  
    contract = Meteor.wrapAsync(FlightDelayController.contracts)(contractId);
 
  	Contracts.update(
      {contractId: contractId, version: version, network: network},
      {$set: {address: contract[0], contractId: contractId, version: version, network: network}},
      {upsert: true}
    );
  
}


reloadContracts = () => {

  FlightDelayController = getContract('FD.Controller', 'FlightDelayController', version, network);

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

      contractsInitialized = true;
      console.log('Contracts reloaded');

  }
}

