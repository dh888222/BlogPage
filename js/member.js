function changeMainContainerPack(first) {
	var buttons = document.getElementsByClassName('user-item');
	var len = buttons.length;
	var cards = document.getElementsByClassName('card');
	function changeToItems(x) {
		console.log(x);
		cards[x].style.display = 'block';
		buttons[x].className = 'user-item now-item';
		buttons[x].onclick = function () {}
		for (var i = 0; i < len; ++i) {
			if (i != x) {
				cards[i].style.display = 'none';
				buttons[i].className = 'user-item';
				(function(x){
					buttons[x].onclick = function() {
						changeToItems(x);
					}
				})(i);
			}
		}
	}
	changeToItems(first);
	return changeToItems;
}

changeMainContainerPack(0);