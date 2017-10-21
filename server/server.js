var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}

	
var winston = require('winston');


String.prototype.padLeft = function (length) {
        var pad = ' '.repeat(length);
        return String(pad + this).slice(-length);
};

String.prototype.padRight = function(l,c) {
  return this+Array(Math.max(0, l-this.length+1)).join(c||" ");};

var ServerLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'Server.log',
      json: false,
      timestamp: function() {
        return new Date().toISOString();
      },
      formatter: function(options) {
        // Options object will be passed to the format function. 
        // It's general properties are: 
        //		timestamp, 
        //		level, 
        //		message, 
        //		meta. 
        // Depending on the transport type may be additional properties.
        // Return string will be passed to logger.
        var levelString = options.level.toUpperCase().padRight(10);
        return options.timestamp() + 
          ' ' + 
          levelString +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '' );
      }})
   ]
});

var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://35.158.95.25:8545"));




/*
console.log('Server started');

var policyCount = FD.getPolicyCount();

var statusToString = function (status) {
        var sts = {
                0 : "Applied",
                1 : "Accepted",
                2 : "Revoked",
                3 : "Paid Out",
                4 : "Expired",
                5 : "Declined"
        };
        return sts[status];
};

var policyFormatterLong = function (policyId, policy, risk) {
	if (!Policies.findOne({id:policyId})) {
        Policies.insert({ 
                id: policyId,
                customer: policy[0], 
                state: statusToString(policy[6].toNumber()), 
                premium: web3.fromWei(policy[1]).toFixed(2),
                riskId: policy[2],
                weight: policy[3].toFixed(0),
                calculatedPayout: web3.fromWei(policy[4]).toFixed(2), 
                actualPayout: web3.fromWei(policy[5]).toFixed(2),
                stateTime: new Date(policy[7].toNumber() * 1000).toLocaleString('de'),
				stateMessage: policy[8].toNumber()
        });
	}

    if (!Risks.findOne({riskId: policy[2]})) {
		Risks.insert({
          riskId: policy[2],
          carrierFlightNumber: risk[0],
          departureYearMonthDay: risk[1],
          arrivalTime: new Date(risk[2].toNumber() * 1000).toLocaleString('de'), 
          delayInMinutes: risk[3].toNumber(),
          delay: risk[4].toNumber(),
          cumulatedWeightedPremium: web3.fromWei(risk[5]).toFixed(2),
          premiumMultiplier: risk[6].toFixed(2)
        });
	}
  
};

Policies.remove({});

for (var id = 0; id < policyCount; id++) {
	try {
		if (!Policies.findOne({id: id})) {
          console.log(id);
          var policy = Meteor.wrapAsync(FD.policies)(id);
          var risk = Meteor.wrapAsync(FD.risks)(policy[2]);
          policyFormatterLong(id, policy, risk);
        }
	} catch (e) {
		console.log(e);
		break;
	}
}

Ledger.remove({});
Ledger.insert({
	account: 0,
	balance: web3.fromWei(FD.ledger(0)).toFixed(4),
	description: 'Premiums'
});

Ledger.insert({
	account: 1,
	balance: web3.fromWei(FD.ledger(1)).toFixed(4),
	description: 'Risk Fund'
});

Ledger.insert({
	account: 2,
	balance: web3.fromWei(FD.ledger(2)).toFixed(4),
	description: 'Payouts'
});

Ledger.insert({
	account: 3,
	description: 'Balance',
	balance: web3.fromWei(FD.ledger(3)).toFixed(4)
});

Ledger.insert({
	account: 4,
	description: 'Reward',
	balance: web3.fromWei(FD.ledger(4)).toFixed(4)
});

Ledger.insert({
	account: 5,
	description: 'OraclizeCosts',
	balance: web3.fromWei(FD.ledger(5)).toFixed(4)
});

Ledger.insert({
	account: 6,
	description: 'Contract Balance',
	balance: web3.fromWei(web3.eth.getBalance(contract_address)).toFixed(4)
});

*/

});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			var userData = Users.findOne(this.userId);
			if(userData.emails && !userData.emails.find(function(mail) { return mail.address == email; })) {
				userOptions.emails = [{ address: email }];
			}
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			for(var key in userOptions) {
				var obj = userOptions[key];
				if(_.isObject(obj)) {
					for(var k in obj) {
						userOptions[key + "." + k] = obj[k];
					}
					delete userOptions[key];
				}
			}
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}

	if(!Users.findOne({ roles: "admin" }) && user.roles.indexOf("admin") < 0) {
		user.roles.push("admin");
	 }

	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(499, "E-mail not verified.");
  }

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	} else {
		// oauth
		if(doc.services) {
			// google e-mail
			if(doc.services.google && doc.services.google.email) {
				doc.profile = doc.profile || {};
				doc.profile.email = doc.services.google.email;
			} else {
				// github e-mail
				if(doc.services.github && doc.services.github.accessToken) {
					var github = new GitHub({
						version: "3.0.0",
						timeout: 5000
					});

					github.authenticate({
						type: "oauth",
						token: doc.services.github.accessToken
					});

					try {
						var result = github.user.getEmails({});
						var email = _.findWhere(result, { primary: true });
						if(!email && result.length && _.isString(result[0])) {
							email = { email: result[0] };
						}

						if(email) {
							doc.profile = doc.profile || {};
							doc.profile.email = email.email;
						}
					} catch(e) {
						console.log(e);
					}
				} else {
					// linkedin email
					if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;
					} else {
						if(doc.services.facebook && doc.services.facebook.email) {
							doc.profile = doc.profile || {};
							doc.profile.email = doc.services.facebook.email;
						} else {
							if(doc.services.twitter && doc.services.twitter.email) {
								doc.profile = doc.profile || {};
								doc.profile.email = doc.services.twitter.email;
							} else {
								if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}
							}
						}
					}
				}
			}
		}
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};
