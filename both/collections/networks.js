this.Networks = new Mongo.Collection("networks");

this.Networks.userCanInsert = function(userId, doc) {
	return true;
};

this.Networks.userCanUpdate = function(userId, doc) {
	return true;
};

this.Networks.userCanRemove = function(userId, doc) {
	return true;
};
