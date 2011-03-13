# AceWidget jQuery Plugin

jquery.acewidget.js is a jQuery plugin for [acewidget](https://github.com/jeromeetienne/acewidget).
It makes acewidget super easy to embed in your own pages.

## How to use it

To create a acewidget, do the following

    <div id="container"></div>
    <script>
        var acewidget	= jQuery('#container').acewidget();
    </script>

### to set a new text

    acewidget.setValue("foobar", function(){
	alert("setValue "+result.status)
    })

The callback is optional' and notified when the action is completed.
It is [jsend compatible](http://labs.omniti.com/labs/jsend/wiki).

### to get the current text

    acewidget.getValue(function(result){
        alert("getValue "+result.status+" text:"+result.data.data)
    })

### to set the tab size

    acewidget.setTabSize(8, function(result){
        alert("setTabSize "+result.status)
    })

### to be notified when the acewidget is loaded

    acewidget.bind('load', function(){
        alert('acewidget is loaded')
    })

