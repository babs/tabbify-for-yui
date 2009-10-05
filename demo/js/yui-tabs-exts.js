YAHOO.util.Event.addListener(window, 'load', function () {
	tabview = new YAHOO.widget.TabView('tabs-location');
});
YAHOO.util.Event.addListener(window, 'load', tabbify);


function tabbify(an_elem) {
	var totabbify = YAHOO.util.Dom.getElementsByClassName("tabbify");
	for ( i in totabbify ) {
		var e = totabbify[i];
		YAHOO.util.Event.addListener(e, 'click', function (evt) {
			YAHOO.util.Dom.removeClass(this, 'tabbify');
			addActiveTab(this.innerHTML, this.href);
			YAHOO.util.Event.preventDefault(evt);
		});
	};
};

function addActiveTab(title, url) {
	// Check if a tab contains already this title and this URL and switch to it
	// Or create a new one otherwise
	var tabi = inTabList(title, url);
	if ( tabi !== false ) {
		tabview.selectTab(tabi);
		return
	}
	// The new tab with the close element and a little loader
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
		// First set the content (for backward reference is the scripts)
		this.set('content', text);
		// Before executing the script part
		$exec(script);
	}
	
	// Apply tabbify on new content
	newtab.addListener('contentChange',function(){tabbify(this)})
	
	// Add the close action on the onClick of the close classed image
	YAHOO.util.Event.on(newtab.getElementsByClassName('close')[0], 'click', function(e, tab) {YAHOO.util.Event.preventDefault(e); tabview.removeTab(tab);}, newtab);
	
	// Finally add the tab
	tabview.addTab(newtab);
}
function inTabList(title, url) {
	var tablist = tabview.get('tabs')
	for ( e in tablist ) {
		if (title+'<span class="close">X</span>' == tablist[e].get('label') && url == tablist[e].get('dataSrc')) {
			return tabview.getTabIndex(tablist[e]);
		}
	}
	return false;
};
