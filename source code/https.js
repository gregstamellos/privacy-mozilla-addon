//var url = require("sdk/url").URL("https://developer.mozilla.org/en-US/Add-ons");
//console.log(url.protocol);


function isSecureHttps(protocol){	  
	  
	  if(protocol === "https:"){
		  //console.log(protocol);
		  return true;
		  
		  //console.log("is secured");
	  }else {
		  //console.log(protocol);
		  return false; 
		  
		  //console.log("is not secured");
	  };
}
	
exports.isSecure = isSecureHttps;	

