goog.provide("mbf.ui.popup");
goog.provide("myFunction");

goog.require('goog.fx');
goog.require('mbf.tmpl');
goog.require('goog.style');
goog.require('goog.fx.dom');
goog.require("goog.ui.Dialog");

/**
 * 
 * Class for showing simple dialog boxes.
 * The Html structure of the dialog box is:
 * <pre>
 *  Element         Function                Class-name, modal-dialog = default
 * ----------------------------------------------------------------------------
 * - iframe         Iframe mask              modal-dialog-bg
 * - div            Background mask          modal-dialog-bg
 * - div            Dialog area              modal-dialog
 *     - div        Title bar                modal-dialog-title
 *        - span                             modal-dialog-title-text
 *          - text  Title text               N/A
 *        - span                             modal-dialog-title-close
 *          - ??    Close box                N/A
 *     - div        Content area             modal-dialog-content
 *        - ??      User specified content   N/A
 *     - div        Button area              modal-dialog-buttons
 *        - button                           N/A
 *        - button
 *        - ...
 * </pre> 
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {goog.ui.Dialog}
 * @see http://closure-library.googlecode.com/svn/docs/class_goog_ui_Dialog.html
 */

mbf.ui.popup = function(opt_class, opt_useIframeMask, opt_domHelper) {
    goog.base(this, opt_useIframeMask, opt_domHelper);
    this.loadTemplate();
    this.setVisible(true);
    this.setBackgroundElementOpacity(0);
    this.setOpacity(0);
};


mbf.ui.prototype.send = function(){
    //var d = "http://localhost/catching_bm/index.php?picture=" + encodeURIComponent(picture) + "&price=" + encodeURIComponent(price) + "&store=" + encodeURIComponent(store) + "&comment=" + encodeURIComponent(comment) + "&title=" + encodeURIComponent(title) + "&browser=" + encodeURIComponent(navigator.userAgent) + "&user=" + encodeURIComponent(mbfUser);
};
goog.inherits(mbf.ui.popup, goog.ui.Dialog);
/*
myFunction = function(){
    var bookMarkletHTML = mbf.tmpl.popup({"img"  :   "http://static.zara.net/photos//2012/V/0/3/p/6050/604/620/6050604620_1_1_3.jpg?timestamp=1334575632358",
    "shop" :   "zara"});
    document.body.appendChild(goog.dom.htmlToDocumentFragment( bookMarkletHTML ));
};
*/

mbf.ui.popup.prototype.loadTemplate = function () {
    this.setContent(mbf.tmpl.popup({"image": "http://static.zara.net/photos//2012/V/0/2/p/5246/409/400/5246409400_1_1_3.jpg?timestamp=1334313218319",
                                    "store": "Zara"}));
    this.setTitle('My Buy Friends');
};


mbf.ui.popup.prototype.setOpacity = function (value) {
    //goog.style.setOpacity(goog.dom.getElementByClass(this.getClass()),value);
    goog.style.setOpacity(this.getElement(), value);
};


mbf.ui.popup.prototype.show = function (duration) {
    var anim = new goog.fx.dom.FadeInAndShow(goog.dom.getElementByClass(this.getClass()), duration);
    document.getElementsByTagName("body")[0].appendChild(this.getElement());
    anim.play();
};

function main(){
    alert("HOLA QUE PASA");
    var popup = new mbf.ui.popup("mbf-bookmarlet", "", false);
    popup.show(1000);
};