chrome.extension.sendMessage({
	currentDiff: true
}, function(res) {
	document.write(JSON.stringify(res));
});