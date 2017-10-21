Contracts.allow({
	insert: function (userId, doc) {
		return Contracts.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Contracts.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Contracts.userCanRemove(userId, doc);
	}
});

Contracts.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Contracts.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Contracts.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Contracts.before.remove(function(userId, doc) {
	
});

Contracts.after.insert(function(userId, doc) {
	
});

Contracts.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Contracts.after.remove(function(userId, doc) {
	
});
