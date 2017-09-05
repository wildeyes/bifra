document.addEventListener('DOMContentLoaded', _ => {
	chrome.extension.sendMessage({
		id: 'getActiveIds'
	}, response => {
		var before = document.querySelector('.before');
		var after = document.querySelector('.after');
		var elements = document.querySelectorAll('.element')
		function setInactive(ele, index) {
			ele.innerHTML = before.innerHTML.replace('{number}', index)
			ele.classList.remove('active')
			chrome.extension.sendMessage({
				id: 'stopLooking', elementId: index
			})
		}
		function setActive(ele, index) {
			ele.innerHTML = after.innerHTML.replace('{number}', index)
			ele.classList.add('active')
			chrome.extension.sendMessage({
				id: 'startLooking', elementId: index
			})
		}
		function set(ele, index) {
			if(ele.classList.contains('active'))
				setInactive(ele, index)
			else
				setActive(ele, index)
		}

		Array.prototype.map.call(elements, e => setInactive(e, e.dataset.index))
		response.elementIds.map(eleId => setActive(elements.find(e => e.dataset.index === eleId), eleId))
		Array.prototype.map.call(elements, e => e.addEventListener('click', _ => set(e, e.dataset.index)))
	})
});	