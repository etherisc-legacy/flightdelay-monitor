Meteor.publish("logs_list", function() {
	return Logs.find({}, {});
});

Meteor.publish("log", function(logId) {
	return Logs.find({_id:logId}, {});
});

