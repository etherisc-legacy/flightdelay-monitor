var pageSession = new ReactiveDict();

Template.Networks.onCreated(function() {
	
});

Template.Networks.onDestroyed(function() {
	
});

Template.Networks.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Networks.events({
	
});

Template.Networks.helpers({
	
});


var NetworksViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("NetworksViewSearchString");
	var sortBy = pageSession.get("NetworksViewSortBy");
	var sortAscending = pageSession.get("NetworksViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["network_id", "network_name", "etherscan_url", "addressresolver", "contract"];
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

var NetworksViewExport = function(cursor, fileType) {
	var data = NetworksViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.NetworksView.onCreated(function() {
	
});

Template.NetworksView.onDestroyed(function() {
	
});

Template.NetworksView.onRendered(function() {
	pageSession.set("NetworksViewStyle", "table");
	
});

Template.NetworksView.events({
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
				pageSession.set("NetworksViewSearchString", searchString);
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
					pageSession.set("NetworksViewSearchString", searchString);
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
					pageSession.set("NetworksViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("networks.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		NetworksViewExport(this.network_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		NetworksViewExport(this.network_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		NetworksViewExport(this.network_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		NetworksViewExport(this.network_list, "json");
	}

	
});

Template.NetworksView.helpers({

	"insertButtonClass": function() {
		return Networks.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.network_list || this.network_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.network_list && this.network_list.count() > 0;
	},
	"isNotFound": function() {
		return this.network_list && pageSession.get("NetworksViewSearchString") && NetworksViewItems(this.network_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("NetworksViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("NetworksViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("NetworksViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("NetworksViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("NetworksViewStyle") == "gallery";
	}

	
});


Template.NetworksViewTable.onCreated(function() {
	
});

Template.NetworksViewTable.onDestroyed(function() {
	
});

Template.NetworksViewTable.onRendered(function() {
	
});

Template.NetworksViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("NetworksViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("NetworksViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("NetworksViewSortAscending") || false;
			pageSession.set("NetworksViewSortAscending", !sortAscending);
		} else {
			pageSession.set("NetworksViewSortAscending", true);
		}
	}
});

Template.NetworksViewTable.helpers({
	"tableItems": function() {
		return NetworksViewItems(this.network_list);
	}
});


Template.NetworksViewTableItems.onCreated(function() {
	
});

Template.NetworksViewTableItems.onDestroyed(function() {
	
});

Template.NetworksViewTableItems.onRendered(function() {
	
});

Template.NetworksViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("networks.details", mergeObjects(Router.currentRouteParams(), {networkId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("networksUpdate", this._id, values, function(err, res) {
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
						Meteor.call("networksRemove", me._id, function(err, res) {
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
		Router.go("networks.update", mergeObjects(Router.currentRouteParams(), {networkId: this._id}));
		return false;
	}
});

Template.NetworksViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Networks.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Networks.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
