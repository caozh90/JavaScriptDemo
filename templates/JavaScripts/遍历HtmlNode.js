var elementName = "";
function countTotalElemet(node){
	var total = 0;
	if(node.nodeType == 1){
		total++;
		elementName = elementName + node.nodeName + "\r\n";
	}
	var childNodes = node.childNodes;
	for(var i=0;i<childNodes.length;i++){
		total += countTotalElemet(childNodes[i]);
	}
	return total;
}
