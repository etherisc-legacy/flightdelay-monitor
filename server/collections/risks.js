Risks.allow({
	insert: function (userId, doc) {
		return Risks.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Risks.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Risks.userCanRemove(userId, doc);
	}
});

Risks.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Risks.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Risks.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Risks.before.remove(function(userId, doc) {
	
});

Risks.after.insert(function(userId, doc) {
	
});

Risks.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Risks.after.remove(function(userId, doc) {
	
});
