Meteor.publish("policies_list", function() {
	return Policies.find({}, {});
});

