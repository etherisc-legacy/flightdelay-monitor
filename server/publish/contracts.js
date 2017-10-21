Meteor.publish("contract_list", function() {
	return Contracts.find({}, {});
});

Meteor.publish("contracts_null", function() {
	return Contracts.find({_id:null}, {});
});

Meteor.publish("contract", function(contractId) {
	return Contracts.find({_id:contractId}, {});
});

