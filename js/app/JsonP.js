goog.provide("mbf.js.JsonP");

/**
 * Resalt the element <IMG> in the document an show popUp
 * @constructor
 */

mbf.js.JsonP = function(options) {
    if(!options) this.options = {};  
    this.script = null;
    this.options.callback = options.callback || function(){};
};

mbf.js.JsonP.prototype.call = function(url, options){  
    /* Ejemplo options 
    var options = {  
        callback:  mifuncion,  
        callbackParamName: "jsoncallback",  
        params: { a:1, b:2}  
    }; 
    */
    //Comprobacion de las opciones  
   
    if(!options) this.options = {};  
    this.options.callback = options.callback || function(){};  
    this.options.callbackParamName = options.callbackParamName || "callback";  
    this.options.params = options.params || [];  

    //Determina si se debe añadir el parámetro separado por ? o por &  
    var separator = url.indexOf("?") > -1? "&" : "?";  

    /*Serializa el objeto en una cadena de texto con formato URL*/  
    var params = [];  
    for(var prop in this.options.params){  
        params.push(prop + "=" + encodeURIComponent(options.params[prop]));  
    }  
    var stringParams = params.join("&");  

    //Crea el script o borra el usado anteriormente  
    var head = document.getElementsByTagName("head")[0];  
    if(this.script){  
        head.removeChild(this.script);  
    }  
    this.script = document.createElement("script");  
    this.script.type = "text/javascript";  
    //Añade y carga el script, indicandole que llame a JSONP.process  
    this.script.src = url + separator + stringParams + (stringParams?"&":"") + this.options.callbackParamName +"=JSONP.process";  
    head.appendChild(this.script);  
}

mbf.js.JsonP.prototype.process = function(data) {  
    /*Aquí pueden hacerse tareas comunes de tratamiento de los datos*/  
    this.options.callback(data);  
}   

/*
function test(){  
    var url = "localhost/closure/popup";  
    var params = {  
        callback: function(data){alert(data);},  
        callbackParamName: "jsoncallback",  
        params: {  
            method: "flickr.test.echo",  
            format: "json",  
            api_key: "fb3db427da4bcda80f74ea31c64cd64d"  
        }  
    };  
    
}  */