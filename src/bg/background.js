// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts

//hack to work quickly
var ele1 = null;
var ele2 = null;
var onEle1 = true;
var currentDiff = null;
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(request.element) {
	  	// chrome.pageAction.show(sender.tab.id);
	  	if(onEle1) ele1 = request.element;
	  	else ele2 = request.element;
	  	onEle1 = !onEle1;

	  	if(ele1 && ele2) {
	  		currentDiff = strictDiff(ele1, ele2)
	  	}
  	}
  	if(request.currentDiff) {
  		sendResponse({
  			currentDiff
  		})
  	}
  });













function strictDiff(){
	return diff(null, [].slice.call(arguments, 0));
}

function custom( opts ){
	return diff(opts, [].slice.call(arguments, 1));
}

function diff( opts, subjects ){
	var length = subjects.length;
	var ref = subjects[0];
	var diff = {};
	var equal = opts && opts.equal || isStrictEqual;
	var c;
	var keys;
	var keysLength;
	var key;
	var u;

	for (var i = 1;i < length;i++) {
		c = subjects[i];
		keys = Object.keys(c);
		keysLength = keys.length;

		for (u = 0;u < keysLength;u++) {
			key = keys[u];

			if (!equal(c[key], ref[key]))
				diff[key] = c[key];
		}
	}

	return diff;
}

function isStrictEqual( a, b ){
	return a === b;
}