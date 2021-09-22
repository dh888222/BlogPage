function ArticleItems(link, imgLink, titleText, contextText) {
	var li = document.createElement('li');
	li.className = "article-items";
	var a = document.createElement('a');
	a.href = link;
	li.appendChild(a);
	var img = document.createElement('img');
	a.appendChild(img);	
	img.onerror = function () {
		this.src = 'img/icon.jpg';
	}
	img.src = imgLink;
	var div = document.createElement('div');
	a.appendChild(div);
	div.className = 'article-inf';
	var title = document.createElement('p');
	title.className = 'article-title';
	var titleTextNode = document.createTextNode(titleText);
	title.appendChild(titleTextNode);
	div.appendChild(title);
	var context = document.createElement('p');
	context.className = 'article-context';
	var contextText = document.createTextNode(contextText);
	context.appendChild(contextText);
	div.appendChild(context);
	this.li = li;
}

function jsonToArticleItems(jsonObj) {
	var ul = document.getElementsByClassName('articles-ul')[0];
	var len = jsonObj.length;
	for (var i = 0; i < len; ++i) {
		var item = new ArticleItems(jsonObj[i]["link"], jsonObj[i]["img"], jsonObj[i]["title"], jsonObj[i]["context"]);
		ul.appendChild(item.li);
	}
}

jsonToArticleItems(aritcleJson["articleJsonList"]);