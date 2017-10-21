var pageSession = new ReactiveDict();

Template.NetworksInsert.onCreated(function() {
	
});

Template.NetworksInsert.onDestroyed(function() {
	
});

Template.NetworksInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NetworksInsert.events({
	
});

Template.NetworksInsert.helpers({
	
});

Template.NetworksInsertForm.onCreated(function() {
	
});

Template.NetworksInsertForm.onDestroyed(function() {
	
});

Template.NetworksInsertForm.onRendered(function() {
	

	pageSession.set("networksInsertFormInfoMessage", "");
	pageSession.set("networksInsertFormErrorMessage", "");

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

Template.NetworksInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("networksInsertFormInfoMessage", "");
		pageSession.set("networksInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var networksInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(networksInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("networksInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("networks", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("networksInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("networksInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("networks", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.NetworksInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("networksInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("networksInsertFormErrorMessage");
	}
	
});
