var origBackgroundColor = null;
var origBorder = null;
var current = null;
var elementId = null;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
		if (request.id === 'startLooking') {
			document.addEventListener('mousemove', mouseMoveHandler)
			document.addEventListener('click', clickHandler)
		} else if (request.id === 'stopLooking') {
			unHover(current);
			document.addRemoveListener('mousemove', mouseMoveHandler)
			document.addRemoveListener('click', clickHandler)
		}
  });

function clickHandler() {
	var element = window.getComputedStyle(current);
	chrome.extension.sendMessage({
		id: 'setElementWithId', elementId, element
	}, _ => {});
}
function mouseMoveHandler(e) {
	unHover(current);
	current = e.target;
	hover(e.target);
}
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
