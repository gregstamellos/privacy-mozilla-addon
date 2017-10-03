//Num of Https_cookies via host
var {Cc, Ci, Cu} = require("chrome");

Cu.import("resource://gre/modules/Services.jsm");

var cookieManager = Cc["@mozilla.org/cookiemanager;1"]
                      .getService(Ci.nsICookieManager2);

				   


function cookiesNum(host){
	console.log(host);
	var resultCookies= cookieManager.countCookiesFromHost(host);
	return resultCookies;
}

function getCookies(host){
	
	
	var cookies = cookieManager.getCookiesFromHost(host);
	var count = 0;
	
	/*while(cookies.hasMoreElements()){
		
		var cookie = cookies.getNext();
		if(cookie instanceof Ci.nsICookie2){
		
		var httpCookie = cookie.isHttpOnly;
		if(httpCookie){
			return count=count+1 ;
		}else{
			return  0;
		}
		}
		
	}*/
	while (cookies.hasMoreElements()){
		var cookie = cookies.getNext().QueryInterface(Ci.nsICookie2);
		//var count = 0;
		
		

		if(cookie.isHttpOnly){
			 count++;
		}
		
			
		
		//console.log("Cookie host: " + cookie.host + "; Cookie Name :" + cookie.name + " = Cookie value:" + cookie.value + "\n");
		dump("\tCookie host: " + cookie.host + " Is Domain cookie: " +cookie.isDomain + "; Cookie Name :" + cookie.name +" = Cookie value:" + cookie.value + "; Is Session Cookie  :" + cookie.isSession + "; Expiry time  :" + cookie.expiry + "; It is an Http only cookie :" + cookie.isHttpOnly  + "\n");
	}
	return count;
	
	
}








function getCookies2(host){
	
	
	var cookies = cookieManager.getCookiesFromHost(host);
	var count2 = 0; 
	/*while(cookies.hasMoreElements()){
		
		var cookie = cookies.getNext();
		if(cookie instanceof Ci.nsICookie2){
		
		var httpCookie = cookie.isHttpOnly;
		if(httpCookie){
			return count=count+1 ;
		}else{
			return  0;
		}
		}
		
	}*/
	while (cookies.hasMoreElements()){
		var cookie = cookies.getNext().QueryInterface(Ci.nsICookie2);
		//var count = 0;
		
		
		if(!cookie.isDomain){
			count2++;
		}
			
		
	}
	return count2;
	
	
}

function getCookies3(host){
	
	
	var cookies = cookieManager.getCookiesFromHost(host);
	var count3 = 0; 
	
	while (cookies.hasMoreElements()){
		var cookie = cookies.getNext().QueryInterface(Ci.nsICookie2);
		//var count = 0;
		
		
		if(cookie.isSession){
			count3++;
		}
			
		
	}
	return count3;
	
	
}


exports.numOfCookies = cookiesNum;
exports.http_Cookies = getCookies; 
exports.thirdP_Cookies = getCookies2;
exports.session_Cookies = getCookies3;



