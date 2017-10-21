var pageSession = new ReactiveDict();

Template.Contracts.onCreated(function() {
	
});

Template.Contracts.onDestroyed(function() {
	
});

Template.Contracts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Contracts.events({
	
});

Template.Contracts.helpers({
	
});


var ContractsContractsListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContractsContractsListSearchString");
	var sortBy = pageSession.get("ContractsContractsListSortBy");
	var sortAscending = pageSession.get("ContractsContractsListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["address", "network", "createTx", "createBlock", "createTime", "abi", "description", "commit"];
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

var ContractsContractsListExport = function(cursor, fileType) {
	var data = ContractsContractsListItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ContractsContractsList.onCreated(function() {
	
});

Template.ContractsContractsList.onDestroyed(function() {
	
});

Template.ContractsContractsList.onRendered(function() {
	pageSession.set("ContractsContractsListStyle", "table");
	
});

Template.ContractsContractsList.events({
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
				pageSession.set("ContractsContractsListSearchString", searchString);
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
					pageSession.set("ContractsContractsListSearchString", searchString);
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
					pageSession.set("ContractsContractsListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contracts.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContractsContractsListExport(this.contract_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContractsContractsListExport(this.contract_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContractsContractsListExport(this.contract_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContractsContractsListExport(this.contract_list, "json");
	}

	
});

Template.ContractsContractsList.helpers({

	"insertButtonClass": function() {
		return Contracts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contract_list || this.contract_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contract_list && this.contract_list.count() > 0;
	},
	"isNotFound": function() {
		return this.contract_list && pageSession.get("ContractsContractsListSearchString") && ContractsContractsListItems(this.contract_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContractsContractsListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContractsContractsListStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ContractsContractsListStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ContractsContractsListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContractsContractsListStyle") == "gallery";
	}

	
});


Template.ContractsContractsListTable.onCreated(function() {
	
});

Template.ContractsContractsListTable.onDestroyed(function() {
	
});

Template.ContractsContractsListTable.onRendered(function() {
	
});

Template.ContractsContractsListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContractsContractsListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContractsContractsListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContractsContractsListSortAscending") || false;
			pageSession.set("ContractsContractsListSortAscending", !sortAscending);
		} else {
			pageSession.set("ContractsContractsListSortAscending", true);
		}
	}
});

Template.ContractsContractsListTable.helpers({
	"tableItems": function() {
		return ContractsContractsListItems(this.contract_list);
	}
});


Template.ContractsContractsListTableItems.onCreated(function() {
	
});

Template.ContractsContractsListTableItems.onDestroyed(function() {
	
});

Template.ContractsContractsListTableItems.onRendered(function() {
	
});

Template.ContractsContractsListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("contracts.details", mergeObjects(Router.currentRouteParams(), {contractId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("contractsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("contractsRemove", me._id, function(err, res) {
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
		Router.go("contracts.update", mergeObjects(Router.currentRouteParams(), {contractId: this._id}));
		return false;
	}
});

Template.ContractsContractsListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Contracts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Contracts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
