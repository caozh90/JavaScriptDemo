//�����ĵ��е�Ԫ��
//getElementById()
//getElementsByTagName()
//getAttribute()
//����Ҫ����Ϣ��ӵ��ĵ���
//createElement()
//createTextNode()
//appendChild()
//insertBefore()
//setAttribute()
//document.body

//��HTMLԪ�غ������Ԫ��
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

//window.onload �¼�����
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

//Dom ���ҳ��Ԫ��
//��ȡҳ���е�AbbreviationsԪ�أ���չʾ����
function displayAbbreviations(){
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length < 1) return false;
	var defs = new Array();
	for(var i=0; i< abbreviations.length; i++){
		if(abbreviations[i].childNodes.length < 1) continue;
		var definition = abbreviations[i].getAttribute("title");
		var key = abbreviations[i].lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.length < 1) return false;
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}
//����ҳ���е�blockquoteԪ�ز���ʾ����
function displayCitations(){
	if(!document.getElementsByTagName || !document.createElement|| !document.createTextNode) return false;
	var quotes = document.getElementsByTagName("blockquote");
	for(var i=0;i<quotes.length;i++){
		if(!quotes[i].getAttribute("cite")){
			continue;
		}
		var url = quotes[i].getAttribute("cite");
		var quoteChildren = quotes[i].getElementsByTagName("*");
		if(quoteChildren.length<1) continue;
		var elem = quoteChildren[quoteChildren.length-1];
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href", url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}

//����ҳ���е�accesskeyԪ�أ���չʾ����
function displayAccesskeys(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	var links = document.getElementsByTagName("a");
	var akeys = new Array();
	for(var i=0;i<links.length;i++){
		var current_link = links[i];
		if(!current_link.getAttribute("accesskey")) continue;
		var key = current_link.getAttribute("accesskey");
		var text = current_link.lastChild.nodeValue;
		akeys[key] = text;
	}
	var list = document.createElement("ul");
	for(key in akeys){
		var text = akeys[key];
		var str = key + ":" + text;
		var item = document.createElement("li");
		var item_text = document.createTextNode(str);
		item.appendChild(item_text);
		list.appendChild(item);
	}
	var header = document.createElement("h3");
	var header_text = document.createTextNode("AccessKey");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(list);
}

//accesskey = 1  home
//accesskey = 2  ���˵�ǰһҳ
//accesskey = 4  �򿪱���վ��������/ҳ��
//accesskey = 9  ����վ����ϵ����
//accesskey = 0  �鿴����վ�Ŀ��ٷ����嵥


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
	if(!document.getElementsByTagName) return false; //对象检测，如果不支持则退�?
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



//
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



