Networks.allow({
	insert: function (userId, doc) {
		return Networks.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Networks.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Networks.userCanRemove(userId, doc);
	}
});

Networks.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Networks.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Networks.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Networks.before.remove(function(userId, doc) {
	
});

Networks.after.insert(function(userId, doc) {
	
});

Networks.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Networks.after.remove(function(userId, doc) {
	
});
