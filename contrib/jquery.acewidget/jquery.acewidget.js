// anonymous closure - BEGIN
(function(jQuery){
// anonymous closure - BEGIN


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//		include microevent.js						//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

var microevent	= function(){}
microevent.prototype	= {
	fcts	: {},
	bind	: function(event, fct){
		this.fcts[event]	= this.fcts[event]	|| [];
		this.fcts[event].push(fct);
		return this;
	},
	unbind	: function(event, fct){
		console.assert(typeof fct === 'function')
		var arr	= this.fcts[event];
		if( typeof arr !== 'undefined' )	return this;
		console.assert(arr.indexOf(fct) !== -1);
		arr.splice(arr.indexOf(fct), 1);
		return this;
	},
	trigger	: function(event /* , args... */){
		var arr	= this.fcts[event];
		if( typeof arr === 'undefined' )	return this;
		for(var i = 0; i < arr.length; i++){
			arr[i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
		return this;
	}
};

microevent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= microevent.prototype[props[i]];
	}
	destObject.prototype['fcts']	= {};
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//		Acewidget class							//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * The internal class of the jquery plugin
 *
 * - it has an event emitter.
 *   - acewidget.bind('load', function(){console.log("widget loaded")})
 *   - acewidget.unbind('load', function(){console.log("widget loaded")})
 })
*/
var Acewidget = function(ctorOpts, jQueryContainer) {
	var self	= this;
	// determine the options
	var opts	= jQuery.extend(true, {}, {
		width		: "600px",
		height		: "400px",
		theme		: "twilight",
		mode		: "javascript",
		iframeUrl	: "http://jeromeetienne.github.com/acewidget/iframe.html"
	}, ctorOpts);
	
	// build the queryUrl
	var queryUrl	= "";
	if( opts.theme)	queryUrl += (queryUrl?"&":'') + "theme="+opts.theme;
	if( opts.mode )	queryUrl += (queryUrl?"&":'') + "mode=" +opts.mode;
	// init some variables
	var finalUrl	= opts.iframeUrl + (queryUrl?'?'+queryUrl:'')
	var domId	= "acewidget-"+Math.floor(Math.random()*99999).toString(36);
	this.elemSelect	= "#"+domId;
	
	// build the dom element
	var elem	= jQuery("<iframe>").attr({
		src	: finalUrl,
		id	: domId,
		width	: opts.width,
		height	: opts.height
	})
	// empty the container and insert the just built element
	$(jQueryContainer).empty().append(elem);
	
	// bind the element 'load' event
	jQuery(elem).bind("load", function(){	self.trigger("load");	});
	
	// bind message
	jQuery(window).bind('message', {self: this}, this._onMessage);
}

/**
 * Destructor
*/
Acewidget.prototype.destroy	= function(){
	// unbind message
	jQuery(window).unbind('message', this._onMessage);
	jQuery(this.elemSelect).remove();
}

/**
 * Received the message from the iframe
*/
Acewidget.prototype._onMessage	= function(jQueryEvent){
	var event	= jQueryEvent.originalEvent;
	//console.log("event.data", event.data);
	var data	= JSON.parse(event.data);
	// notify the callback if specified
	if( 'userdata' in data && 'callback' in data.userdata ){
		//console.log("notify callback to", data.userdata.callback, "with", data)
		var callback	= window[data.userdata.callback];
		// remove the callback from the dom
		delete window[data.userdata.callback];
		// remove the callback from data.userdata
		// - thus the user get its userdata unchanged
		delete data.userdata.callback;
		// if data.userdata is now empty, remove it
		if( Object.keys(data.userdata).length === 0 )		delete data.userdata;
		// notify the caller
		callback(data);
	}
}

/**
 * Send message to the iframe
*/
Acewidget.prototype._send	= function(event, callback){	
	var iframeWin	= jQuery(this.elemSelect).get(0).contentWindow;
	// if a callback is present, install it now
	if( callback ){
		event.userdata	= event.userdata	|| {}
		event.userdata.callback	= "acewidgetCall-"+Math.floor(Math.random()*99999).toString(36);
		window[event.userdata.callback]	= function(data){
			callback(data)
		};
	}
	// post the message
	iframeWin.postMessage(JSON.stringify(event), "*");			
}


/**
 * Helper for setValue event
 *
 * - this is a helper function on top of acewidget.send()
 *
 * @param {String} text	the text to push in acewidget
 * @param {Function} callback will be notified with the result (jsend compliant)
*/
Acewidget.prototype.setValue	= function(text, callback){
	this._send({
		type	: "setValue",
		data	: {
			text: text
		}
	}, callback);	
}

/**
 * Helper for setValue event
 *
 * - this is a helper function on top of acewidget.send()
 *
 * @param {String} text	the text to push in acewidget
 * @param {Function} callback will be notified with the result (jsend compliant)
*/
Acewidget.prototype.getValue	= function(callback){
	this._send({
		type	: "getValue"
	}, callback);
}

/**
 * Helper for setValue event
 *
 * - this is a helper function on top of acewidget.send()
 *
 * @param {String} text	the text to push in acewidget
 * @param {Function} callback will be notified with the result (jsend compliant)
*/
Acewidget.prototype.setTabSize	= function(tabSize, callback){
	this._send({
		type	: "setTabSize",
		data	: {
			size: tabSize
		}		
	}, callback);
}

// mixin microevent.js in Acewidget
microevent.mixin(Acewidget);


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//		jQuery plugin itself						//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// declare the jquery plugin
jQuery.fn.acewidget = function(ctorOpts) {
	var jQueryContainer	= this;
	return new Acewidget(ctorOpts, jQueryContainer)
}

// anonymous closure - END
})(jQuery)
// anonymous closure - END
