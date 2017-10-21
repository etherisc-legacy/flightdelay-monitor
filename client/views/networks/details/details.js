var pageSession = new ReactiveDict();

Template.NetworksDetails.onCreated(function() {
	
});

Template.NetworksDetails.onDestroyed(function() {
	
});

Template.NetworksDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NetworksDetails.events({
	
});

Template.NetworksDetails.helpers({
	
});

Template.NetworksDetailsForm.onCreated(function() {
	
});

Template.NetworksDetailsForm.onDestroyed(function() {
	
});

Template.NetworksDetailsForm.onRendered(function() {
	

	pageSession.set("networksDetailsFormInfoMessage", "");
	pageSession.set("networksDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.NetworksDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("networksDetailsFormInfoMessage", "");
		pageSession.set("networksDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var networksDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(networksDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("networksDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("networksDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("networks", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("networks", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.NetworksDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("networksDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("networksDetailsFormErrorMessage");
	}
	
});
