Meteor.publish("ledger_list", function() {
	return Ledger.find({}, {});
});

