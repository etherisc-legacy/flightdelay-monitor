var pageSession = new ReactiveDict();

Template.Risks.onCreated(function() {
	
});

Template.Risks.onDestroyed(function() {
	
});

Template.Risks.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Risks.events({
	
});

Template.Risks.helpers({
	
});


var RisksRisksListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RisksRisksListSearchString");
	var sortBy = pageSession.get("RisksRisksListSortBy");
	var sortAscending = pageSession.get("RisksRisksListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["carrierFlightNumber", "departureYearMonthDay", "arrivalTime", "delayInMinutes", "delay", "cumulatedWeightedPremium", "premiumMultiplier", "riskId"];
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

var RisksRisksListExport = function(cursor, fileType) {
	var data = RisksRisksListItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.RisksRisksList.onCreated(function() {
	
});

Template.RisksRisksList.onDestroyed(function() {
	
});

Template.RisksRisksList.onRendered(function() {
	pageSession.set("RisksRisksListStyle", "table");
	
});

Template.RisksRisksList.events({
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
				pageSession.set("RisksRisksListSearchString", searchString);
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
					pageSession.set("RisksRisksListSearchString", searchString);
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
					pageSession.set("RisksRisksListSearchString", "");
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
		RisksRisksListExport(this.risks_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RisksRisksListExport(this.risks_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RisksRisksListExport(this.risks_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RisksRisksListExport(this.risks_list, "json");
	}

	
});

Template.RisksRisksList.helpers({

	"insertButtonClass": function() {
		return Risks.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.risks_list || this.risks_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.risks_list && this.risks_list.count() > 0;
	},
	"isNotFound": function() {
		return this.risks_list && pageSession.get("RisksRisksListSearchString") && RisksRisksListItems(this.risks_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RisksRisksListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RisksRisksListStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("RisksRisksListStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("RisksRisksListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RisksRisksListStyle") == "gallery";
	}

	
});


Template.RisksRisksListTable.onCreated(function() {
	
});

Template.RisksRisksListTable.onDestroyed(function() {
	
});

Template.RisksRisksListTable.onRendered(function() {
	
});

Template.RisksRisksListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("RisksRisksListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RisksRisksListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RisksRisksListSortAscending") || false;
			pageSession.set("RisksRisksListSortAscending", !sortAscending);
		} else {
			pageSession.set("RisksRisksListSortAscending", true);
		}
	}
});

Template.RisksRisksListTable.helpers({
	"tableItems": function() {
		return RisksRisksListItems(this.risks_list);
	}
});


Template.RisksRisksListTableItems.onCreated(function() {
	
});

Template.RisksRisksListTableItems.onDestroyed(function() {
	
});

Template.RisksRisksListTableItems.onRendered(function() {
	
});

Template.RisksRisksListTableItems.events({
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

		Meteor.call("risksUpdate", this._id, values, function(err, res) {
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
						Meteor.call("risksRemove", me._id, function(err, res) {
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

Template.RisksRisksListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Risks.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Risks.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
