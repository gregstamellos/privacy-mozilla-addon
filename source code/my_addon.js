var hsts = require("./hsts");
var https = require("./https");
var HTTP_cookies = require("./Cookies&HttpCookies");
var keyPins = require("./HPKP");
var cert_auth = require("./CA");
var cipher_ssl = require("./cipher_ssl");
var tabs = require("sdk/tabs");
var self = require("sdk/self").data;

var {Cc, Ci, Cu} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

tabs.on('load', function(tab) {


var URL = tab.url;
var url = require("sdk/url").URL(URL);
var protocol = url.protocol;
var hostname = url.hostname;
var host = url.host;

console.log(hostname);
//https call function
var result_Https = https.isSecure(protocol);
console.log("Https : " +result_Https);

//HSTS call function
var result_HSTS = hsts.isSecure(hostname);
console.log("HSTS : " +result_HSTS);



//keyPins
var result_keyPins = keyPins.keyPinsRes(hostname);
console.log("HPKP : " +result_keyPins);
//HTTP_cookies call function



var result_getCookies = HTTP_cookies.http_Cookies(host);
console.log("Http Cookies Number: " +result_getCookies);


var result_getCookies2 = HTTP_cookies.thirdP_Cookies(host);
console.log("Third Party Cookies: " +result_getCookies2);

var result_getCookies3 = HTTP_cookies.session_Cookies(host);
console.log("Session Cookies Number: " +result_getCookies3);

var result_cookiesNum = HTTP_cookies.numOfCookies(host);
console.log(" Cookies Number : " +result_cookiesNum);

var result_CA = cert_auth.CA_res(url);
console.log("Certification Authority:"+result_CA);


var result_CipherSSL = cipher_ssl.Cipher_res(url);
console.log("Cipher Suite:"+result_CipherSSL);


//console.log("Cookies index : " + result_getCookies);
//example
//var email = "gregstam";
//var pass = 1234;
//var status = "cool";
//post threats


//SOSSS

var Request = require("sdk/request").Request;
var quijote = Request({
  url: "http://localhost/my_addon/post1.php",
  //url: "http://localhost/my_addon/api.php",
  content: {url:URL,isSecure:result_Https,isSecureHSTS:result_HSTS,useHPKP:result_keyPins,total:result_cookiesNum,httpCookies:result_getCookies,sessionCookies:result_getCookies3,thirdPartyCookies:result_getCookies2,useCA:result_CA,useCipher:result_CipherSSL},
  //content: {name:URL,email:email , password:pass, status:status},
  //overrideMimeType: "text/plain; charset=latin1",
  onComplete: function (response) {
	  //var data = response.json;
	  //var err = data.Error;
	  }
	  
  
});

quijote.post();


});




//create button
var button = require("sdk/ui/button/action").ActionButton({
	id:"show-panel",
	label:"Privacy-Thesis",
	icon:{
		"16": "./icon-16.png",
		"32": "./icon-32.png"
	},
	onClick: handleClick
});



var addonPanel = require("sdk/panel").Panel({
	width : 350,
	height : 430,
	contentURL : self.url("my_addon.html"),
	contentScriptFile : self.url("myaddon_script.js"),
	contentScriptWhen : "ready" 
});


function handleClick(state){
	
	var URL = tabs.activeTab.url;
	var url = require("sdk/url").URL(URL);
	var protocol = url.protocol;
	var hostname = url.hostname;
	var host = url.host;

//HTTPS	
var result_Https = https.isSecure(protocol);
console.log("Https : " +result_Https);

//HSTS call function
var result_HSTS = hsts.isSecure(hostname);
console.log("HSTS : " +result_HSTS);

//keyPins
var result_keyPins = keyPins.keyPinsRes(hostname);
console.log("HPKP : " +result_keyPins);

//HTTP_cookies call function
var result_getCookies = HTTP_cookies.http_Cookies(host);
console.log("Http Cookies Number: " +result_getCookies);


var result_getCookies2 = HTTP_cookies.thirdP_Cookies(host);
console.log("Third Party Cookies: " +result_getCookies2);

var result_getCookies3 = HTTP_cookies.session_Cookies(host);
console.log("Session Cookies Number: " +result_getCookies3);

var result_cookiesNum = HTTP_cookies.numOfCookies(host);
console.log(" Cookies Number : " +result_cookiesNum);

var result_CA = cert_auth.CA_res(url);
console.log("Certification Authority:"+result_CA);


var result_CipherSSL = cipher_ssl.Cipher_res(url);
console.log("Cipher Suite:"+result_CipherSSL);

//GET INFO FROM DATABASE
var Request = require("sdk/request").Request;
var api = Request({
  //url: "https://statics.tls.security.mozilla.org/server-side-tls-conf-4.0.json",
  url: "http://localhost/my_addon/get.php?url="+host,
  onComplete: function (response) {
    
	//var data = JSON.parse(response.json);
	//var data = response.json[0].total;
	var total = response.json[0].cookieAverage;
	var http = response.json[0].httpAverage;
	var session = response.json[0].sessionAverage;
	var thirdParty = response.json[0].thirdAverage;
	var parseTotal = parseFloat(total);
	var parseHttp = parseFloat(http);
	var parseSession = parseFloat(session);
	var parseThirdParty = parseFloat(thirdParty);
	
	var data5 = (6 * parseTotal + 1 * parseHttp + 1 * parseSession + 2 * parseThirdParty)/10 ;
	
	var data = data5.toFixed(2);
	//var data1 = data.url;
	//var data1 = data * 2;
	//var data1 = data.Info.url[0];
	//var data1 = data.configurations.modern.ciphersuites[0];
	//var data = Cc["@mozilla.org/dom/json;1"]
          //.createInstance(Ci.nsIJSON).decode(response.json);

	
	//console.log(data1);
	
    console.log(parseTotal);
	console.log(parseHttp);
	console.log(parseSession);
	console.log(parseThirdParty);
	console.log(data5+"%");
	// ftiaxnw mia weighted function kai eimai komple
	
	addonPanel.port.emit('avg', data);
  }
}).get();



	
	addonPanel.port.emit('data', result_Https, result_HSTS, result_keyPins, result_getCookies, result_getCookies2, result_getCookies3, result_cookiesNum, result_CA, result_CipherSSL);
	
	addonPanel.show({
		position:button
	});
  
}

