# ace widget

AceWidget is a widget which aims to make ace trivial to embed in your page.
The Vision is to be super simple to embed and have no server to setup.
It provide the whole official [embeded api](https://github.com/ajaxorg/ace/wiki/Embedding---API).
That's it. No fuss no muss.

seeing is believing, here is a [demo](http://jeromeetienne.github.com/acewidget/demo.html)

## How to embed it

You add the following in your own page. and that it

    <iframe src="http://jeromeetienne.github.com/acewidget/iframe.html"></iframe>

You can add constructor parameters the url. For example 

    http://jeromeetienne.github.com/acewidget/iframe.html?theme=twilight&mode=javascript

#### Constructor parameters

`theme` To set the theme of the editor

`mode` To set the mode of the editor

      
## API

The api calls are done via the usual [window.postMessage()](https://developer.mozilla.org/en/DOM/window.postMessage)
to send message to the acewidget

## Events sent to the widget

I tried to be [jsend compatible](http://labs.omniti.com/labs/jsend/wiki).

### userdata

It is possible to pass private data to the sent event. They
will be treated as opaque data by the widget. The widget will
include it in its reply. The field name is 'userdata'

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

### getValue

`getValue`: get the current text content

    {
        type    : "getValue",
        userdata: "foobar"
    }
    
It will returns

    {
        status  : "succeed",
        data    : {
            data    : "super text content from widget",
            userdata: "foobar"
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



