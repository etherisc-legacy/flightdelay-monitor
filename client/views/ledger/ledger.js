var pageSession = new ReactiveDict();

Template.Ledger.onCreated(function() {
	
});

Template.Ledger.onDestroyed(function() {
	
});

Template.Ledger.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Ledger.events({
	
});

Template.Ledger.helpers({
	
});


var LedgerLedgerListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LedgerLedgerListSearchString");
	var sortBy = pageSession.get("LedgerLedgerListSortBy");
	var sortAscending = pageSession.get("LedgerLedgerListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["account", "description", "balance"];
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

var LedgerLedgerListExport = function(cursor, fileType) {
	var data = LedgerLedgerListItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.LedgerLedgerList.onCreated(function() {
	
});

Template.LedgerLedgerList.onDestroyed(function() {
	
});

Template.LedgerLedgerList.onRendered(function() {
	pageSession.set("LedgerLedgerListStyle", "table");
	
});

Template.LedgerLedgerList.events({
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
				pageSession.set("LedgerLedgerListSearchString", searchString);
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
					pageSession.set("LedgerLedgerListSearchString", searchString);
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
					pageSession.set("LedgerLedgerListSearchString", "");
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
		LedgerLedgerListExport(this.ledger_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LedgerLedgerListExport(this.ledger_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LedgerLedgerListExport(this.ledger_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LedgerLedgerListExport(this.ledger_list, "json");
	}

	
});

Template.LedgerLedgerList.helpers({

	"insertButtonClass": function() {
		return Ledger.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.ledger_list || this.ledger_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.ledger_list && this.ledger_list.count() > 0;
	},
	"isNotFound": function() {
		return this.ledger_list && pageSession.get("LedgerLedgerListSearchString") && LedgerLedgerListItems(this.ledger_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LedgerLedgerListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LedgerLedgerListStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("LedgerLedgerListStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("LedgerLedgerListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LedgerLedgerListStyle") == "gallery";
	}

	
});


Template.LedgerLedgerListTable.onCreated(function() {
	
});

Template.LedgerLedgerListTable.onDestroyed(function() {
	
});

Template.LedgerLedgerListTable.onRendered(function() {
	
});

Template.LedgerLedgerListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("LedgerLedgerListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LedgerLedgerListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LedgerLedgerListSortAscending") || false;
			pageSession.set("LedgerLedgerListSortAscending", !sortAscending);
		} else {
			pageSession.set("LedgerLedgerListSortAscending", true);
		}
	}
});

Template.LedgerLedgerListTable.helpers({
	"tableItems": function() {
		return LedgerLedgerListItems(this.ledger_list);
	}
});


Template.LedgerLedgerListTableItems.onCreated(function() {
	
});

Template.LedgerLedgerListTableItems.onDestroyed(function() {
	
});

Template.LedgerLedgerListTableItems.onRendered(function() {
	
});

Template.LedgerLedgerListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("ledgerUpdate", this._id, values, function(err, res) {
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
						Meteor.call("ledgerRemove", me._id, function(err, res) {
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

Template.LedgerLedgerListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Ledger.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Ledger.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
