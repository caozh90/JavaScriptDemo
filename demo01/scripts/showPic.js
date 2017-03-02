function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if(placeholder.nodeName != "IMG") return true;
	placeholder.setAttribute("src", source); 
	if(!document.getElementById("description")) return false;
	var text = whichpic.getAttribute("title")? whichpic.getAttribute("title"): "";
	var description = document.getElementById("description"); 
	if(description.firstChild.nodeType == 3){
		description.firstChild.nodeValue = text;	
	}
	return false;
}

function countBodyChildren(){
	var bodyElement = document.getElementsByTagName("body")[0].
	alert(bodyElement.childNodes.length);
	alert(bodyElement.nodeType);
}

function popUp(winURL){
	window.open(winURL, "popup", "width=320,height=480");
}

//window.onload = prepareLinks;
function prepareLinks(){
	if(!document.getElementsByTagName) return false; //对象检测，如果不支持则退出
	var links = document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		if(links[i].getAttribute("class")=="popup"){
			links[i].onclick=function(){
				popUp(this.getAttribute("href"));
				return false;
			}
		}
	}
}

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
//		links[i].onkeypress= links[i].onclick;
	}
}

//DOM加载完成后，完成一些初始化工作，window.onload后执行的函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);




function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.jpg");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
//	document.getElementsByTagName("body")[0].appendChild(placeholder);
//	document.getElementsByTagName("body")[0].appendChild(description);
//	document.body.appendChild(description);;
	var gallery = document.getElementById("imagegallery");
//	gallery.parentNode.insertBefore(placeholder,gallery);
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}

//在HTML某个节点元素后面添加新的节点元素
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
