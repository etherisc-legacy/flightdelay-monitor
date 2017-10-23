


formatArgs = (args) => {
  
  result = [];
  
  for (var key in args) {
    
    if (key.slice(0,3) == 'str' || key == '_stateMessage') {
      result.push(key + ' : ' + Buffer.from(args[key].slice(2), 'hex').toString().replace(/\0/g,''));
    } else {
      result.push(key + ' : ' + args[key]);
    }
    
  }
  
  return result.join('<br />');
    
}

readLogs = (contractId, contractName, version, network) => {

  contract = getContract(contractId, contractName, version, network);
  if (typeof contract == 'undefined') return;
  
  var allEvents = contract.allEvents({fromBlock: 4200000, toBlock: 'latest'});
  
  if (typeof allEvents == 'undefined') return;
  
	
  getLogs = (callback) => { allEvents.get(callback); };
  
  logs = Meteor.wrapAsync(getLogs)();
      
  for (var index in logs) {
    event = logs[index];
    event.argsString = formatArgs(event.args);
    if (typeof event.args._policyId != 'undefined') {
   		event.abstract = 'PolicyId: ' + (event.args._policyId.toNumber() + 10000).toString().slice(1);
    }
    block = web3.eth.getBlock(event.blockNumber);
    event.timestamp = block.timestamp*1000;
    event.blockNumberLogIndex = event.blockNumber + '-' + (event.logIndex + 10000).toString().slice(1);
    Logs.insert(event);      
  }

}


reloadLogs = () => {
  
  if (!contractsInitialized) return;

  Logs.remove({});
  
  readLogs('FD.NewPolicy', 'FlightDelayNewPolicy', version, network);
  readLogs('FD.Underwrite', 'FlightDelayUnderwrite', version, network);
  readLogs('FD.Payout', 'FlightDelayPayout', version, network);
  readLogs('FD.Ledger', 'FlightDelayLedger', version, network);
  readLogs('FD.Database', 'FlightDelayDatabase', version, network);
  readLogs('FD.AccessController', 'FlightDelayAccessController', version, network);
  readLogs('FD.Controller', 'FlightDelayController', version, network);
  
 
}
