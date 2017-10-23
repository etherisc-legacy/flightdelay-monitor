var pageSession = new ReactiveDict();

Template.Logs.onCreated(function() {
	
});

Template.Logs.onDestroyed(function() {
	
});

Template.Logs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Logs.events({
	
});

Template.Logs.helpers({
	
});


Template.LogsLogsIntroReloadLogs.onCreated(function() {
	
});

Template.LogsLogsIntroReloadLogs.onDestroyed(function() {
	
});

Template.LogsLogsIntroReloadLogs.onRendered(function() {
	

	pageSession.set("logsLogsIntroReloadLogsInfoMessage", "");
	pageSession.set("logsLogsIntroReloadLogsErrorMessage", "");

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

Template.LogsLogsIntroReloadLogs.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logsLogsIntroReloadLogsInfoMessage", "");
		pageSession.set("logsLogsIntroReloadLogsErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logsLogsIntroReloadLogsMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(logsLogsIntroReloadLogsMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logsLogsIntroReloadLogsInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logsLogsIntroReloadLogsErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call('reloadLogs', (e,r) => { 
  if (e) {
    console.log('Error reloading logs: ' + e.message);
  } else {
    console.log('Logs reloaded');
  }
});
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.LogsLogsIntroReloadLogs.helpers({
	"infoMessage": function() {
		return pageSession.get("logsLogsIntroReloadLogsInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logsLogsIntroReloadLogsErrorMessage");
	}
	
});

var LogsLogsListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LogsLogsListSearchString");
	var sortBy = pageSession.get("LogsLogsListSortBy");
	var sortAscending = pageSession.get("LogsLogsListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["event", "contractId", "blockNumberLogIndex", "timestamp", "type", "abstract"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var LogsLogsListExport = function(cursor, fileType) {
	var data = LogsLogsListItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.LogsLogsList.onCreated(function() {
	
});

Template.LogsLogsList.onDestroyed(function() {
	
});

Template.LogsLogsList.onRendered(function() {
	pageSession.set("LogsLogsListStyle", "table");
	
});

Template.LogsLogsList.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("LogsLogsListSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("LogsLogsListSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("LogsLogsListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LogsLogsListExport(this.logs_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LogsLogsListExport(this.logs_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LogsLogsListExport(this.logs_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LogsLogsListExport(this.logs_list, "json");
	}

	
});

Template.LogsLogsList.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logs_list || this.logs_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logs_list && this.logs_list.count() > 0;
	},
	"isNotFound": function() {
		return this.logs_list && pageSession.get("LogsLogsListSearchString") && LogsLogsListItems(this.logs_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LogsLogsListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LogsLogsListStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("LogsLogsListStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("LogsLogsListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LogsLogsListStyle") == "gallery";
	}

	
});


Template.LogsLogsListTable.onCreated(function() {
	
});

Template.LogsLogsListTable.onDestroyed(function() {
	
});

Template.LogsLogsListTable.onRendered(function() {
	
});

Template.LogsLogsListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("LogsLogsListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LogsLogsListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LogsLogsListSortAscending") || false;
			pageSession.set("LogsLogsListSortAscending", !sortAscending);
		} else {
			pageSession.set("LogsLogsListSortAscending", true);
		}
	}
});

Template.LogsLogsListTable.helpers({
	"tableItems": function() {
		return LogsLogsListItems(this.logs_list);
	}
});


Template.LogsLogsListTableItems.onCreated(function() {
	
});

Template.LogsLogsListTableItems.onDestroyed(function() {
	
});

Template.LogsLogsListTableItems.onRendered(function() {
	
});

Template.LogsLogsListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("logs.details", mergeObjects(Router.currentRouteParams(), {logId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("logsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("logsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.LogsLogsListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
