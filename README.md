Tabbify for YUI TabView Widget
==============================

This simple couple of files will allow you how to transform links to tabs and also
execute JS of dynamicaly loaded tab content of [YUI2][yui] [TabView widget][tabview].

For the JS intepretation, some part has been taken from the very good [Mootools][mootools] framework.

This also include automaticaly a detection of already openned links (easily disablable, see inTabList) 
and a close function on tab label.

[yui]: http://developer.yahoo.com/yui/2/
[tabview]: http://developer.yahoo.com/yui/tabview/
[mootools]: http://mootools.net

Usage
-----
Include the requirements of TabView and both files:

 * yui-tabs-exts.js
 * tools-from-mootools.js

Just add a tabbify class to your link and the tabbify function do the rest.
"tabbify" class will be removed because tabbify function must be called on each content loaded to get it working on new tabs.

Warning
-------
Links openned from tabs a related to the main page, not the location of the original file, ex:

In a page index.html, a link in pages/test-link.html contains a link to test-linked.html (located in pages/ subdir).

=> If the test-link.html page is loaded via a tab of index.html, test-linked.html must be referenced as /pages/test-linked.html.

=> If the pages/test-link.html is directly loaded in the browser, the link should be test-linked.html without the pages/.

What I suggest is to NOT use relative path, and use only absolute path (like /pages/test-linked.html) or locate all your pages in the same location.

About JS Interpretation
-----------------------
You'll found the trick in the success handler:

	var newtab = new YAHOO.widget.Tab({
		label: title + '<span class="close">X</span>',
		content: '<div style="text-align: center;"><img src="css/loading_transparent.gif" /></div>',
		dataSrc: url,
		cacheData: true,
		active: true
	});
	// Set success and failure handler
	newtab.loadHandler.failure = function (o) {this.set('content','Request failed.')};
	newtab.loadHandler.success = function (o) {
        var script;
        var text;
		stripScript(o.responseText, function(s,t){ script=s; text=t });
		this.set('content', text);
		$exec(script);
	}
	tabview.addTab(newtab);
