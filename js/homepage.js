function fullPageChangerPackage() {
	var nowCount = 0;
	var fullPageItems = document.getElementsByClassName('full-page-item');
	var fullPageItemsLen = fullPageItems.length;
	var firstPageOn = true;
	var bannerItems = document.getElementsByClassName('banner-item');
	var itemsLen = bannerItems.length;
	var svgPath = document.getElementById('pageSvg').getElementsByTagName('path')[0];
	var timeOutSecond = 600;
	var delayTimeOut;
	var inDelay = false;
	var allWheelDeltaY = 0;
	var wheelDeltaYTimeOut;
	var throttleTimeOut;
	for (var i = 0; i < fullPageItemsLen; ++i) {
		fullPageItems[i].style.top = i * 100 + "%";
	}
	function changeToMoveFullPage() {
		document.body.addEventListener('mousewheel', moveFullPage, { passive : false});
	}
	function pageKeepNotMove(e) {
		var event = e || window.event;
		event.preventDefault();
		event.stopPropagation();
	}
	document.body.addEventListener('mousewheel', pageKeepNotMove, {passive : false});
	function moveFullPage(event, key) {
		console.log(inDelay);
		var e = event || window.event;
		//console.log(e);
		if (!key) {key = 1;}
		function go() {
			if (e && e.wheelDeltaY > 0) {
				key = -1;
			}
			moveToFullPage(e, key);
		}
		if (inDelay && allWheelDeltaY == 0) {
			inDelay = false;
		}
		//console.log(allWheelDeltaY);
		if (e && Math.abs(allWheelDeltaY) < 120 * 4.5) {
			allWheelDeltaY += e.wheelDeltaY;
			console.log(allWheelDeltaY);
			if (wheelDeltaYTimeOut) {
				clearTimeout(wheelDeltaYTimeOut);
			}
			wheelDeltaYTimeOut = setTimeout(function() {
				allWheelDeltaY = 0;
			}, timeOutSecond);
			return;
		}else {
			go();
			inDelay = true;
		}
	}
	function moveToFullPage(e, key, changeCount) {
		if (inDelay) {
			return;
		}
		if (changeCount != undefined) {
			nowCount = (changeCount + fullPageItemsLen - 1) % fullPageItemsLen;
			key = 1;
		}
		var intervalTime = 1000;
		//console.log(e);
		if (nowCount == 0 && e && e.deltaY < 0 && firstPageOn) {
			return false;
		}
		if (nowCount == fullPageItemsLen - 1 && (!e || e.deltaY > 0)) {
			return false;
		}
		if (nowCount == 0 && firstPageOn && key > 0) {
			firstPageOn = false;
			for (var i = 0; i < itemsLen; ++i) {
				var item = bannerItems[i];
				item.style.width = "calc(100vw - 240px)";
				item.style.height = "calc(100vh - 222px)";
				item.style.borderRadius = '20px';
				//item.style.left = "120px";
			}
			svgPath.style.stroke = "#3c3c3c";
		}else if (nowCount == 0 && !firstPageOn && key < 0) {
			//console.log('test');
			firstPageOn = true;
			for (var i = 0; i < itemsLen; ++i) {
				var item = bannerItems[i];
				item.style.width = "100vw";
				item.style.height = "calc(100vh - 122px)";
				item.style.borderRadius = '0px';
			}
			svgPath.style.stroke = "#fff";
		}else {
			nowCount += key;
			if (nowCount > itemsLen) {
				nowCount = itemsLen;
			}
			for (var i = 0; i < fullPageItemsLen; ++i) {
				fullPageItems[i].style.top = -(nowCount - i) * 100 + "%";
			}
		}
		if (nowCount == itemsLen) {
			if (svgTransformInterval) {
				clearInterval(svgTransformInterval);
				svgTransformInterval = undefined;
				svgTransformer.container.style.opacity = '0';
			}
		}else {
			if (!svgTransformInterval && svgTransformer.transformer) {
				svgTransformer.container.style.opacity = '.8';
				svgTransformInterval = setInterval(svgTransformer.transformer, 25);
			}
		}
		return true;
	}
	return {
		changeToMoveFullPage : changeToMoveFullPage,
		moveFullPage : moveFullPage,
	}
}

function bannerChangerPackage() {
	var now = 0;
	var allBannerItems = document.getElementsByClassName("banner-item");
	var allBannerItemsLen = allBannerItems.length;
	var bannerChangerInterval;
	function changeBannerButton(pos) {
		//console.log(pos);
		clearInterval(bannerChangerInterval);
		changeBanner(pos);
		bannerChangerInterval = setInterval(changeBannerTime, 3000);
	}
	function changeBannerTime() {
		changeBanner((now + 1) % allBannerItemsLen);
	}
	function changeBanner(pos) {
		now = pos;
		for (var i = 0; i < allBannerItemsLen; ++i) {
			if (now != i) {
				allBannerItems[i].style.opacity = '0';
			}
		}
		allBannerItems[now].style.opacity = '1';
	}
	changeBannerButton(0);
	return {
		changeButton : changeBannerButton,
		items : allBannerItems,
		itemsLen : allBannerItemsLen,

	}
}

function svgTransformPackage() {
	var container = document.getElementById('pageSvg');
	var transformItem = container.getElementsByTagName('g')[0];
	//console.log(transfromItem);
	var Count = 0;
	function trans() {
		Count = (Count + 1) % 40;
		var y = (Count / 5 - 4) ** 2 + 5;
		transformItem.style.transform = "matrix(1,0,0,1,14," + y + ")";
	}
	return {
		transformer : trans,
		container : container,
	}
}

document.ontouchend = function(e) {
	console.log(e);
}

var svgTransformer = svgTransformPackage();
var svgTransformInterval = setInterval(svgTransformer.transformer, 25);

var fullPageItemsChanger = fullPageChangerPackage();
fullPageItemsChanger.changeToMoveFullPage();
document.getElementById('pageSvg').onclick = function() {
	fullPageItemsChanger.moveFullPage(undefined, 1);
};

var bannerChangerObj = bannerChangerPackage();
var bannerChanger = bannerChangerObj.changeButton;
