# ace widget

AceWidget is a widget iframe which make including ace in your page simple.

   <iframe src="http://acewidget.org"></iframe>
   
   http://jeromeetienne.github.com/acewidget/?theme=twilight&mode=javascript
   
   http://jeromeetienne.github.com/acewidget
   
## API

The api is done via the usual
[window.postMessage()](https://developer.mozilla.org/en/DOM/window.postMessage).

## Event to the widget

### setTheme
`setTheme`: To change current theme to twilight
    {
        type    : "setTheme",
        data    : {
            theme   : "twilight"
        }
    }

### setMode
`setMode`: To change current mode to javascript
    {
        type    : "setMode",
        data    : {
            mode    : "javascript"
        }
    }

### setValue
`setValue`: To change current text content
    {
        type    : "setValue",
        data    : {
            text    : "supernewtext"
        }
    }

### gotoLine
`gotoLine`: To change the current line to 42
    {
        type    : "setValue",
        data    : {
            line    : 42
        }
    }

### setTabSize
`setTabSize`: To change the current tabsize to 8
    {
        type    : "setTabSize",
        data    : {
            size    : 8
        }
    }

## vision

* be super simple to install (no server)
  * so a iframe with an api
* provide all API from [ace wiki](https://github.com/ajaxorg/ace/wiki/Embedding---API)
* that's it


