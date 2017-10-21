var pageSession = new ReactiveDict();

Template.NetworksUpdate.onCreated(function() {
	
});

Template.NetworksUpdate.onDestroyed(function() {
	
});

Template.NetworksUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.NetworksUpdate.events({
	
});

Template.NetworksUpdate.helpers({
	
});

Template.NetworksUpdateForm.onCreated(function() {
	
});

Template.NetworksUpdateForm.onDestroyed(function() {
	
});

Template.NetworksUpdateForm.onRendered(function() {
	

	pageSession.set("networksUpdateFormInfoMessage", "");
	pageSession.set("networksUpdateFormErrorMessage", "");

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

Template.NetworksUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("networksUpdateFormInfoMessage", "");
		pageSession.set("networksUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var networksUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(networksUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("networksUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("networks", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("networksUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("networksUpdate", t.data.network._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.NetworksUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("networksUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("networksUpdateFormErrorMessage");
	}
	
});
