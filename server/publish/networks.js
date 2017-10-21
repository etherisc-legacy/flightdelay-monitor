Meteor.publish("network_list", function() {
	return Networks.find({}, {});
});

Meteor.publish("networks_null", function() {
	return Networks.find({_id:null}, {});
});

Meteor.publish("network", function(networkId) {
	return Networks.find({_id:networkId}, {});
});

