Meteor.methods({
	"risksInsert": function(data) {
		if(!Risks.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Risks.insert(data);
	},

	"risksUpdate": function(id, data) {
		var doc = Risks.findOne({ _id: id });
		if(!Risks.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Risks.update({ _id: id }, { $set: data });
	},

	"risksRemove": function(id) {
		var doc = Risks.findOne({ _id: id });
		if(!Risks.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Risks.remove({ _id: id });
	}
});
