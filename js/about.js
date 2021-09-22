function CultureShowInformation() {
	var contain = document.getElementById('show-culture');
	var mainImg = contain.getElementsByClassName('culture-show-inf-img')[0];
	mainImg.onclick = function (e) {
		e.stopPropagation();
	}
	function append(who) {
		mainImg.src = 'img/culture-inf' + who + '.jpg';
		contain.style.display = 'block';
		console.log(who);
		return false;
	}
	this.append = append;
	contain.onclick = function () {
		contain.style.display = 'none';
		return false;
	}
}

function cultureItmesClick(itemClicker) {
	var items = document.getElementsByClassName('culture-items');
	var itemsLen = items.length;
	for (var i = 0; i < itemsLen; ++i) {
		(function() {
			var j = i + 1;
			items[i].onclick = function () {
				itemClicker(j);
			}
			return false;
		})();
	}
	return true;
}


var cultureItemsClicker = new CultureShowInformation();
cultureItmesClick(cultureItemsClicker.append);