Ledger.allow({
	insert: function (userId, doc) {
		return Ledger.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Ledger.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Ledger.userCanRemove(userId, doc);
	}
});

Ledger.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Ledger.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Ledger.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Ledger.before.remove(function(userId, doc) {
	
});

Ledger.after.insert(function(userId, doc) {
	
});

Ledger.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Ledger.after.remove(function(userId, doc) {
	
});
