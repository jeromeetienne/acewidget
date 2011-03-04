/**
 * * docs https://github.com/ajaxorg/ace/wiki/Embedding---API
*/

var AceEditor	= function(){
	this.editor	= ace.edit("editor");		
	var theme	= jQuery.url.param("theme")	|| null;
	var mode	= jQuery.url.param("mode")	|| null;
	if( theme )	this.editor.setTheme("ace/theme/"+theme);
	if( mode )	this.editor.getSession().setMode(new (require("ace/mode/"+mode).Mode)());		


	window.addEventListener("message", function(event){
		// keep message IIF in a iframe
		if( window.parent === window )		return;
		// keep only message from the parent window
		if( event.source !== window.parent)	return;
		// parse the event
		var eventFull	= JSON.parse(event.data);
		var eventType	= eventFull.type;
		var eventData	= eventFull.data;
		//console.log("eventFull", eventFull);
		//console.log("window message", event.data, event.origin);
		var methodName	= "on" + eventType.substr(0,1).toUpperCase() + eventType.substr(1);
		if( methodName in this ){
			this[methodName](eventData);
		}
	}.bind(this), false);	
}

AceEditor.prototype.onPutText	= function(data){
	var text	= data.text;
	this.editor.getSession().getDocument().setValue(text);
	//this.editor.getSession().setTabSize(8);
}

AceEditor.prototype.onGotoLine	= function(data){
	var arg	= parseInt(data.text);
	this.editor.gotoLine(arg);
	//this.editor.getSession().setTabSize(8);
}

AceEditor.prototype.onSetTabSize	= function(data){
	var arg	= parseInt(data.text);
	this.editor.getSession().setTabSize(arg);
}

var main	= function(){
//	jQuery("#editor").html("console.log('dd');");
	var editor	= new AceEditor();
}