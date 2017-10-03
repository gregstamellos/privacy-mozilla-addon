var {Cc, Ci, Cu} = require("chrome");

var oReq = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();


function Cipher_ssl(url,timeout,callback){



			var x;
			var oReq = new XMLHttpRequest();
			/*
			oReq.ontimeout = function(){
			console.error("The request for"+url+"timed out.");
						};
			*/
			oReq.onload = function(){
	
			//dumpSecurityInfo(oReq);
			//console.log(oReq);
	
			let channel = oReq.channel;
			//console.log(url);

			var secInfo = channel.securityInfo;
	
	

					if (secInfo instanceof Ci.nsISSLStatusProvider) {
							var cipher = secInfo.QueryInterface(Ci.nsISSLStatusProvider)
								.SSLStatus.QueryInterface(Ci.nsISSLStatus);
				  
					var protocolVersion = cipher.protocolVersion;
					//var x=2;
					//console.log(x);
					dump("\tChiper Name = " + cipher.cipherName + "\n");
					dump("\tKey Length = " + cipher.keyLength + " bits  \n");
					dump("\tSecret Key Length = " + cipher.secretKeyLength + " bits  \n");  
					dump("\tUntrasted = " + cipher.isUntrusted + "\n");		
					dump("\tProtocol Version = " + protocolVersion + "\n");
					dump("\tis Not Valid At This Time= " + cipher.isNotValidAtThisTime+ "\n");
						/*switch (protocolVersion) {
						
							case Ci.nsISSLStatus.SSL_VERSION_3:
							dump("\tProtocol version : SSLv3\n");
							break;
							case Ci.nsISSLStatus.TLS_VERSION_1:
							dump("\tProtocol version : TLSv1\n");
							break;
							case Ci.nsISSLStatus.TLS_VERSION_1_1:
							dump("\tProtocol version : TLSv1.1\n");
							break;
							case Ci.nsISSLStatus.TLS_VERSION_1_2:
							dump("\tProtocol version : TLSv1.2\n");
							break;
					}		
						*/
				x=1;
				//console.log(x);
				callback.apply(oReq,x);	
			}else{
				dump("\t CIPHER SSL NOT FOUND\n");
				x=0;
				//console.log(x);
				callback.apply(oReq,x);
			}
			
	
return x;
	
};
oReq.open("GET",url,false);
//console.log(x);
//oReq.timeout=timeout;

oReq.send();

return x;
}


exports.Cipher_res=Cipher_ssl;
					
						
					
						