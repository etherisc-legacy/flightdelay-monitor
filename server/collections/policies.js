Policies.allow({
	insert: function (userId, doc) {
		return Policies.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Policies.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Policies.userCanRemove(userId, doc);
	}
});

Policies.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Policies.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Policies.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Policies.before.remove(function(userId, doc) {
	
});

Policies.after.insert(function(userId, doc) {
	
});

Policies.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Policies.after.remove(function(userId, doc) {
	
});
