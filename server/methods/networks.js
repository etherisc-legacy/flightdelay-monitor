Meteor.methods({
	"networksInsert": function(data) {
		if(!Networks.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Networks.insert(data);
	},

	"networksUpdate": function(id, data) {
		var doc = Networks.findOne({ _id: id });
		if(!Networks.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Networks.update({ _id: id }, { $set: data });
	},

	"networksRemove": function(id) {
		var doc = Networks.findOne({ _id: id });
		if(!Networks.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Networks.remove({ _id: id });
	}
});
