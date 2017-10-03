var {Cc, Ci, Cu} = require("chrome");

var activeBrowserWindow = require("sdk/window/utils").getMostRecentBrowserWindow();

Cu.import("resource://gre/modules/Services.jsm");

var gSSService = Cc["@mozilla.org/ssservice;1"]
                   .getService(Ci.nsISiteSecurityService);

// For now, STS data gets stored in permissions.sqlite.
// See https://bugzilla.mozilla.org/show_bug.cgi?id=775370.

var permissionManager = Cc["@mozilla.org/permissionmanager;1"]
                          .getService(Ci.nsIPermissionManager);

// We should not store anything permanent in permissions.sqlite in private
// browsing mode.

var FLAGS = require("sdk/private-browsing").isPrivate(activeBrowserWindow) ?
Ci.nsISocketProvider.NO_PERMANENT_STORAGE : 0;



var STS_KNOCKOUT = permissionManager.DENY_ACTION;
var STS_SET = permissionManager.ALLOW_ACTION;
var STS_UNSET = permissionManager.UNKNOWN_ACTION;
var STS_TYPE = Ci.nsISiteSecurityService.HEADER_HSTS;


function isSecureUri(hostname){
	var uri = Services.io.newURI("https://"+hostname, null, null);
	var resultURI = gSSService.isSecureURI(STS_TYPE,uri,FLAGS);
	//console.log(uri);
	return resultURI;
}


exports.isSecure = isSecureUri;