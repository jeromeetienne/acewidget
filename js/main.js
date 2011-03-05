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
		var userdata	= eventFull.userdata;
		//console.log("eventFull", eventFull);
		//console.log("window message", event.data, event.origin);
		var methodName	= "on" + eventType.substr(0,1).toUpperCase() + eventType.substr(1);
		if( methodName in this ){
			var ret	= this[methodName](eventData);
			if( ret != undefined ){
				window.parent.postMessage(JSON.stringify({
					status	: "succeed",
					data	: {
						userdata: userdata,
						data	: ret
					}
				}), "*");
			}
		}else{
			console.log("event ", eventType, "is unknown")
		}
	}.bind(this), false);	
}

AceEditor.prototype.onSetTheme	= function(data){
	this.editor.setTheme("ace/theme/"+data.theme);
}

AceEditor.prototype.onSetMode	= function(data){
	var mode	= data.mode;
	this.editor.getSession().setMode(new (require("ace/mode/"+mode).Mode)());
}

AceEditor.prototype.onSetValue	= function(data){
	this.editor.getSession().getDocument().setValue(data.text);
}

AceEditor.prototype.onGotoLine	= function(data){
	this.editor.gotoLine(data.line);
}

AceEditor.prototype.onSetTabSize	= function(data){
	this.editor.getSession().setTabSize(data.size);
}


AceEditor.prototype.onGetValue	= function(data){
	return this.editor.getSession().getDocument().getValue();
}

var main	= function(){
//	jQuery("#editor").html("console.log('dd');");
	var editor	= new AceEditor();
}