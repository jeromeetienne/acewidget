# ace widget

AceWidget is a widget iframe which make including ace in your page simple.

   <iframe src="http://acewidget.org"></iframe>
   
   http://jeromeetienne.github.com/acewidget/?theme=twilight&mode=javascript
   
   http://jeromeetienne.github.com/acewidget
   
## API

The api is done via the usual
[window.postMessage()](https://developer.mozilla.org/en/DOM/window.postMessage).

    
    {
        type	: "setTheme",
	data	: {
		theme	: "twilight"
	}
    }

## vision

* be super simple to install (no server)
  * so a iframe with an api
* provide all API from [ace wiki](https://github.com/ajaxorg/ace/wiki/Embedding---API)
* that's it

