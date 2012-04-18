
javascript:(function(){
						
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'http://www.somedomain.com/somescript.js';
	headID.appendChild(newScript);


})()
