/* From Mootools */
document.head = document.getElementsByTagName('head')[0];
function stripScript(intext, option){
		var scripts = '';
		var text = intext.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
			scripts += arguments[1] + '\n';
			return '';
		});
		if (option === true) $exec(scripts);
		else if (typeof(option) == 'function') option(scripts, text);
		return text;
};

Browser = {
        Engine: {name: 'unknown', version: 0},
        Platform: {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()},
        Features: {xpath: !!(document.evaluate), air: !!(window.runtime), query: !!(document.querySelector)},
        Plugins: {},
        Engines: {
                presto: function(){
                        return (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925));
                },
                trident: function(){
                        return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? 5 : 4);
                },
                webkit: function(){
                        return (navigator.taintEnabled) ? false : ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525 : 420) : 419);
                },
                gecko: function(){
                        return (document.getBoxObjectFor == undefined) ? false : ((document.getElementsByClassName) ? 19 : 18);
                }
        }
};

function $exec(text){
	if (!text) return text;
	if (window.execScript){
		window.execScript(text);
	} else {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText' : 'text'] = text;
		document.head.appendChild(script);
		document.head.removeChild(script);
	}
	return text;
};

