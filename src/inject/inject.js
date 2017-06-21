

var origBackgroundColor = null;
var origBorder = null;
function hover(ele) {
	origBackgroundColor = ele.style.backgroundColor
	origBorder = ele.style.border
	ele.style.backgroundColor = 'yellow';
	ele.style.border = '2px solid red';
}
function unHover(ele) {
	if(ele) {
	ele.style.backgroundColor = origBackgroundColor
	ele.style.border = origBorder
	}
}

var current = null;

document.addEventListener('click', (e) => {
	var element = window.getComputedStyle(current);
	chrome.extension.sendMessage({
		element
	}, function(res) {
		if(res) console.log('res', res)
		// var readyStateCheckInterval = setInterval(function() {
		// if (document.readyState === "complete") {
		// 	clearInterval(readyStateCheckInterval);

		// 	// ----------------------------------------------------------
		// 	// This part of the script triggers when page is done loading
		// 	console.log("Hello. This message was sent from scripts/inject.js");
		// 	// ----------------------------------------------------------

		// }
		// }, 10);
	});
})
document.addEventListener('mousemove', (e) => {
	unHover(current);
	current = e.target;
	hover(e.target);
})
// document.addEventListener('DOMContentLoaded', _ => {
// });	