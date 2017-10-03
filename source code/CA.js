var {Cc, Ci, Cu} = require("chrome");



var oReq = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
	
	
	
function CA(url,timeout,callback){
	
		var x;
		var oReq = new XMLHttpRequest();
		//oReq.open("GET",url,true);
		/*
		oReq.ontimeout = function(){
			console.error("The request for"+url+"timed out.");
		};
		*/
		oReq.onload = function(){
		//oReq.onreadystatechange = function(e){
	
		//dumpSecurityInfo(oReq);
		//console.log(oReq);
	
		let channel = oReq.channel;
		//console.log(url);
		var secInfo = channel.securityInfo;
		//function checkCa(secInfo)
	
		//oReq.onreadystatechange= check_CA(secInfo){
									
			
									
				if (secInfo instanceof Ci.nsISSLStatusProvider) {
						var cert = secInfo.QueryInterface(Ci.nsISSLStatusProvider)
												.SSLStatus.QueryInterface(Ci.nsISSLStatus).serverCert;
														 //dump("\nCertificate Status:\n");

										
								dump("\tCommon name (CN) = " + cert.commonName + "\n");
								dump("\tIssuer = " + cert.issuerOrganization + "\n");
								dump("\tOrganisation = " + cert.organization + "\n");  
								//The fingerprint of the certificate's DER encoding,calculated using the SHA1 algorithm.
								dump("\tSHA1 fingerprint = " + cert.sha1Fingerprint + "\n");
								//The fingerprint of the certificate's DER encoding,calculated using the SHA-256 algorithm.
								dump("\tSHA256 fingerprint = " + cert.sha256Fingerprint + "\n");
								dump("\tToken Name = " + cert.tokenName + "\n");
								//dump("\tCertificate Type = " + cert.certType + "\n");


							var validity = cert.validity.QueryInterface(Ci.nsIX509CertValidity);
									  
									  
								dump("\tValid from " + validity.notBeforeGMT + "\n");
								dump("\tValid until " + validity.notAfterGMT + "\n");
								x=1;
								//console.log(x);
								callback.apply(oReq,x);				
								}else{
									dump("\tCERTIFICATION AUTHORITY NOT FOUND\n");
										//return false;
										x=0
										//console.log(x);
										callback.apply(oReq,x);
											}
							
							//}
					/*
					var result = check_CA(secInfo);
					dump("\t"+result+"\n");
					return result;
		*/
		return x;
								
};
oReq.open("GET",url,false);
//console.log(x);
//oReq.timeout=timeout;

oReq.send();
//return oReq.onload();
//var res = CA(url);
//return res;
return x;
//var result = check_CA(secInfo); 
//return check_CA();
}




exports.CA_res=CA;