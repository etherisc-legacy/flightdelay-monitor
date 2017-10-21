this.Ledger = new Mongo.Collection("ledger");

this.Ledger.userCanInsert = function(userId, doc) {
	return true;
};

this.Ledger.userCanUpdate = function(userId, doc) {
	return true;
};

this.Ledger.userCanRemove = function(userId, doc) {
	return true;
};
