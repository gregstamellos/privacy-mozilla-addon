self.port.on('data', function(https, hsts, keyPins, httpCookies, thirdParty, sessionCookies, totalCookies, CA, SSL){

	document.getElementById("https").innerHTML = https;
	
	document.getElementById("hsts").innerHTML = hsts;
	
	document.getElementById("keyPins").innerHTML = keyPins;
	
	document.getElementById("httpCookies").innerHTML = httpCookies;
	
	document.getElementById("3hParty").innerHTML = thirdParty;
	
	document.getElementById("session").innerHTML = sessionCookies;
	
	document.getElementById("total").innerHTML = totalCookies;
	
	document.getElementById("CA").innerHTML = CA;
	
	document.getElementById("SSL").innerHTML = SSL;
});

self.port.on('avg', function(avg){
	document.getElementById("avg").innerHTML = avg;
	
  var elem = document.getElementById("myBar");   
  var width = 0;
   //var neo = 73;
  var id = setInterval(frame, 70);
  function frame() {
    if (width >= avg && width<=100) {
      clearInterval(id);
    } else { 
	  if(width<=20){
	  width++;
	  elem.style.backgroundColor='green'; 	  
      elem.style.width = width + '%'; 
      document.getElementById("label").innerHTML = width * 1  + '%safe';
	  }else if(width<=65 && width>=21){
		  width++;
		 elem.style.backgroundColor='orange';	  
         elem.style.width = width + '%'; 
         document.getElementById("label").innerHTML = width * 1  + '%';
		  
	  }else{
		 width++;
		 elem.style.backgroundColor='red';	  
         elem.style.width = width + '%'; 
         document.getElementById("label").innerHTML = width * 1  + '%danger';
		  
	  }
    }
  }
	
});