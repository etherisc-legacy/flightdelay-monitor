reloadDatabase = () => {

  if (!contractsInitialized) return;
  
  
  FlightDelayDatabase = getContract('FD.Database', 'FlightDelayDatabase', version, network);
  FlightDelayLedger = getContract('FD.Ledger', 'FlightDelayLedger', version, network);
  LedgerAddress = FlightDelayLedger.address;
  LedgerBalance = FlightDelayLedger.balance;

  console.log('LedgerAddress: ', LedgerAddress);

  FD = {};
  FD.Ledger = Meteor.wrapAsync(FlightDelayDatabase.ledger);
  FD.Policies = Meteor.wrapAsync(FlightDelayDatabase.policies);
  FD.Risks = Meteor.wrapAsync(FlightDelayDatabase.risks);

  Ledger.remove({});
  Ledger.insert({
      account: 0,
      balance: Number(web3.fromWei(FD.Ledger(0))).toFixed(4),
      description: 'Premiums'
  });

  Ledger.insert({
      account: 1,
      balance: Number(web3.fromWei(FD.Ledger(1))).toFixed(4),
      description: 'Risk Fund'
  });

  Ledger.insert({
      account: 2,
      balance: Number(web3.fromWei(FD.Ledger(2))).toFixed(4),
      description: 'Payouts'
  });

  Ledger.insert({
      account: 3,
      description: 'Balance',
      balance: Number(web3.fromWei(FD.Ledger(3))).toFixed(4)
  });

  Ledger.insert({
      account: 4,
      description: 'Reward',
      balance: Number(web3.fromWei(FD.Ledger(4))).toFixed(4)
  });

  Ledger.insert({
      account: 5,
      description: 'OraclizeCosts',
      balance: Number(web3.fromWei(FD.Ledger(5))).toFixed(4)
  });

  Ledger.insert({
      account: 6,
      description: 'Contract Balance',
      balance: Number(web3.fromWei(LedgerBalance)).toFixed(4)
  });


  //var policyCount = FD.getPolicyCount();

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

  var currencyToString = function (currency) {
          var cur = {
                  0 : "ETH",
                  1 : "EUR",
                  2 : "USD",
                  3 : "GBP"
          };
          return cur[currency];
  };

  var policyFormatterLong = function (policyId, policy, risk) {
      if (!Policies.findOne({id:policyId})) {
          Policies.insert({ 
                  policyId: policyId,
                  customer: policy[0], 
                  state: statusToString(policy[6].toNumber()), 
                  premium: web3.fromWei(policy[1]).toFixed(2),
                  riskId: policy[2],
                  weight: policy[3].toFixed(0),
                  calculatedPayout: web3.fromWei(policy[4]).toFixed(2), 
                  actualPayout: web3.fromWei(policy[5]).toFixed(2),
                  stateTime: new Date(policy[7].toNumber() * 1000).toLocaleString('de'),
                  stateMessage: Buffer.from(policy[8].slice(2), 'hex').toString().replace(/\0/g, ''),
                  currency: currencyToString(policy[10]),
                  customerExternalId: Buffer.from(policy[11].slice(2), 'hex').toString().replace(/\0/g, '')
          });
      }

      if (!Risks.findOne({riskId: policy[2]})) {
          Risks.insert({
            riskId: policy[2],
            carrierFlightNumber: Buffer(risk[0].slice(2),'hex').toString().replace(/\0/g, ''),
            departureYearMonthDay: Buffer(risk[1].slice(2), 'hex').toString().replace(/\0/g, ''),
            arrivalTime: new Date(risk[2].toNumber() * 1000).toLocaleString('de'), 
            delayInMinutes: risk[3].toNumber(),
            delay: risk[4].toNumber(),
            cumulatedWeightedPremium: web3.fromWei(risk[5]).toFixed(2),
            premiumMultiplier: risk[6].toFixed(2)
          });
      }

  };

  Policies.remove({});
  Risks.remove({});

  var id = 0; 
  while (true) {
      try {
          if (!Policies.findOne({policyId: id})) {
            console.log(id);
            var policy = FD.Policies(id);
            var risk = FD.Risks(policy[2]);
            policyFormatterLong(id, policy, risk);
          }
      } catch (e) {
          console.log(e);
          break;
      }
      id++;
  }

  console.log('Database reloaded');

}
