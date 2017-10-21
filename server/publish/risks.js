Meteor.publish("risks_list", function() {
	return Risks.find({}, {});
});

