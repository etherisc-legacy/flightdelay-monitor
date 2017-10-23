Meteor.publish("policies_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("policy", function(policyId) {
	return Policies.find({_id:policyId}, {});
});

