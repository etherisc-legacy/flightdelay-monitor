Meteor.methods({
	"ledgerInsert": function(data) {
		if(!Ledger.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Ledger.insert(data);
	},

	"ledgerUpdate": function(id, data) {
		var doc = Ledger.findOne({ _id: id });
		if(!Ledger.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Ledger.update({ _id: id }, { $set: data });
	},

	"ledgerRemove": function(id) {
		var doc = Ledger.findOne({ _id: id });
		if(!Ledger.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Ledger.remove({ _id: id });
	}
});
