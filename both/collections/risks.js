this.Risks = new Mongo.Collection("risks");

this.Risks.userCanInsert = function(userId, doc) {
	return true;
};

this.Risks.userCanUpdate = function(userId, doc) {
	return true;
};

this.Risks.userCanRemove = function(userId, doc) {
	return true;
};
