goog.require("goog.ui.Dialog");
goog.require('mbf.tmpl');

goog.provide("mbf.ui.nujiWebtaglet");

/**
 * Resalt the element <IMG> in the document an show popUp
 * @constructor
 */

mbf.ui.MbfTargetImage = function() {
    this.imageArray = new Array();
    this.imageCount = 0;
    this.dialogOpen = false;
    this.startWebtaglet();
    this.dialog = new goog.ui.Dialog();
    this.dialog.setEscapeToCancel(false);
    this.dialog.setTitle('Sending to My buy friends');
    this.dialog.setButtonSet(null);
    this.mbfUser = goog.global.mbfUser;
    this.imageSelectedURL = "";
    this.base_url = "http://www.mybuyfriends.com/";
};

/**
 * Calculates the position of the <IMG>
 * @param a Element image
 * @return Coordinates
 */

mbf.ui.MbfTargetImage.prototype.getImageLocation = function (a) {
        var c = a.offsetLeft;
        var b = a.offsetTop;
        while (a.offsetParent) {
            c = c + a.offsetParent.offsetLeft;
            b = b + a.offsetParent.offsetTop;
            if (a != document.getElementsByTagName("body")[0]) {
                a = a.offsetParent;
            } else {
                break;
            }
        }
        return [c, b];
 };
 
/**
 * Send the information to the server
 */

mbf.ui.MbfTargetImage.prototype.send = function (){    
    var picture = this.imageSelectedURL;
    var price = goog.dom.getElement("mbf-marklet-price").value;
    if(price == "") {price = "NS";}
    var store = location.hostname;
    var status = "NS";
    if(document.getElementById("mbf-status-public").checked){
        status = "public";
    }else{
        status = "private";
    }
    con.log(status);
    var comment = goog.dom.getElement("mbf-marklet-comment").value;
    if(comment == "") {comment="NS";}
    var title = goog.dom.getElement("mbf-marklet-title").value;
    if(title == "")   {title = "NS";}
    var name = this.getName(encodeURIComponent(store));
    var d = this.base_url + "save_product/save/" + encodeURIComponent(this.mbfUser) + "/" + encodeURIComponent(picture) + "/" + encodeURIComponent(price) + "/" + encodeURIComponent(title) + "/" + encodeURIComponent(comment) + "/" + encodeURIComponent(document.location.href) + "/" + encodeURIComponent(store) + "/" + name + "/" + "browser" + "/" + status ;
    con.log(d);
    //var d = "http://mybuyfriends.com/bm_mba/catching_bm/index.php?picture=" + encodeURIComponent(picture) + "&price=" + encodeURIComponent(price) + "&store=" + encodeURIComponent(store) + "&comment=" + encodeURIComponent(comment) + "&title=" + encodeURIComponent(title) + "&browser=" + encodeURIComponent(navigator.userAgent) + "&user=" + encodeURIComponent(this.mbfUser);
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript");
    b.setAttribute("method", "post");
    b.setAttribute("src", d);
    document.getElementsByTagName("head")[0].appendChild(b);
    alert("Producto enviado!");
    this.dialog.setVisible(false);
    this.stopWebtaglet();
    this.dialog.dispose();
};

/**
 * Cancel popup
 */

mbf.ui.MbfTargetImage.prototype.cancel = function (){ 
    this.dialog.setVisible(false);
    this.stopWebtaglet();
    this.dialog.dispose();
}

/**
 * Tag the product and show the popUp.
 * @param {Number} c the index of the img selected in this.array
 *
 */

mbf.ui.MbfTargetImage.prototype.tagProduct = function (c) {
    var popup = null;
    var d = "";
    var content = "";
    if (this.dialog.isVisible()) {       
        /*var productHTML = goog.dom.htmlToDocumentFragment(mbf.tmpl.product({"image": this.imageArray[c].src , "store": location.hostname}));
        goog.dom.getElement("mbf-marklet-content").appendChild(productHTML);*/
        this.imageSelectedURL = this.imageArray[c].src;
        content = mbf.tmpl.product({"image": this.imageArray[c].src , "store": location.hostname});
        this.dialog.setContent('<div id="mbf-marklet-content"> ' + content + '</div>' + mbf.tmpl.buttons());

    }else{
        this.imageSelectedURL = this.imageArray[c].src;
        content = mbf.tmpl.product({"image": this.imageArray[c].src , "store": location.hostname});
        this.dialog.setContent('<div id="mbf-marklet-content"> ' + content + '</div>' + mbf.tmpl.buttons());
    }
    this.dialog.setVisible(true);
    var sendButton = goog.dom.getElement("mbf-button-send");
    var cancelButton = goog.dom.getElement("mbf-button-cancel");

    //Events
    goog.events.listen(sendButton, goog.events.EventType.CLICK,
        this.send, false, this);
    goog.events.listen(cancelButton, goog.events.EventType.CLICK,
        this.cancel, false, this);
};

/**
 *  Inserts the CSS in the document, and finds the <img> in the document.
 */

mbf.ui.MbfTargetImage.prototype.startWebtaglet = function () {
    if (!document.getElementById("nuji_webtaglet")) {
        var j = document.createElement("link");
        j.setAttribute("href", "http://mybuyfriends.com/bm_mba/bm/css/targetImage.css");
        j.setAttribute("rel", "stylesheet");
        j.setAttribute("type", "text/css");
        var a = document.createElement("div");
        a.id = "nuji_webtaglet";
        document.getElementsByTagName("head")[0].appendChild(j);
        document.getElementsByTagName("body")[0].appendChild(a);
    }
    var c = document.getElementsByTagName("img");
    for (var b = 0; b < c.length; b++) {
        var d = c[b];
        if (d.offsetWidth >= 100 && d.offsetHeight >= 100) {
            this.imageArray[this.imageCount] = d;
            var i = this.getImageLocation(d)[0];
            var g = this.getImageLocation(d)[1];
            var f = d.offsetWidth;
            var e = d.offsetHeight;
            var h = document.createElement("div");
            h.id = "webtag_highlight_" + this.imageCount;
            h.style.left = i + "px";
            h.style.top = g + "px";
            h.style.height = (e - 40) + "px";
            h.style.width = (f - 40) + "px";
            h.style.display = "block";
            h.innerHTML = "<div id='webtag_instruction_" + this.imageCount + "' style='-moz-border-radius: 15px;-webkit-border-radius: 15px;color:yellow;font-family:Arial,Helvetica,sans-serif;margin-top:" + ((e - 100) / 2) + "px;'>Send to MBF</div>";
            h.setAttribute("class", "nuji_image");
            h.setAttribute("onclick", "nuji_webtaglet_instance.tagProduct(" + this.imageCount + ")");
            document.getElementById("nuji_webtaglet").appendChild(h);
            this.imageCount++
        }
    }
};

/**
 * Remove the elements of the bookMarklet System.
 */

mbf.ui.MbfTargetImage.prototype.stopWebtaglet = function () {
    var b = document.getElementById("nuji_webtaglet");
    for (var a = 0; a < this.imageCount; a++) {
        var c = document.getElementById("webtag_highlight_" + a);
        b.removeChild(c)
    }
    setTimeout(function () {
        this.imageCount = 0;
        window.isWebtagletRunning = false
    }, 1000)
};

mbf.ui.MbfTargetImage.prototype.getName = function (url) {
    var name = url.split(".");
    if(name.length == 2){return name[0];}
    else                {return name[1];}
}



if (!window.isWebtagletRunning) {   
    var con=goog.global.console;
    window.isWebtagletRunning = true;
    var nuji_webtaglet_instance = new mbf.ui.MbfTargetImage();  
};