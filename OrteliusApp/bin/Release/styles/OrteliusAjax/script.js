var allClasses = new Array();

var shownHiddenDetails;

var currentElement;
var currentPath= new Array();

var winLoc = window.location;

var currentButtons = new Array(null,null,null);
var layerHistory = new Array();

var allIndexLists = new Array("classList","indexByName","indexByModifiedTime");

var origUrl = location.href

window.onload = function(){
    showElement("introText");
    shownHiddenDetails = [
    { "name": "showInherited_publicmethod", "show": true }, 
    { "name": "showInherited_protectedmethod", "show": true }, 
    { "name": "showInherited_internalmethod", "show": true },  
    { "name": "showInherited_privatemethod", "show": true }, 
    { "name": "showInherited_publicproperties", "show": true }, 
    { "name": "showInherited_protectedproperties", "show": true }, 
    { "name": "showInherited_internalproperties", "show": true },
    { "name": "showInherited_privateproperties", "show": true },
    { "name": "div|dependency", "show": false },    
    { "name": "div|see", "show": false }, 
    { "name": "div|details", "show": false }, 
    { "name": "div|example", "show": false }, 
    { "name": "div|publicmethod", "show": true }, 
    { "name": "div|import", "show": false }, 
    { "name": "div|publicproperties", "show": true }, 
    { "name": "div|parameters", "show": true }, 
    { "name": "div|methoddetails", "show": false }, 
    { "name": "div|propdetails", "show": false}, 
    { "name": "div|protectedmethod", "show": false }, 
    { "name": "div|protectedproperties", "show": false },
    { "name": "div|internalmethod", "show": false }, 
    { "name": "div|internalproperties", "show": false },
    { "name": "div|privatemethod", "show": false }, 
    { "name": "div|privateproperties", "show": false }   ];
}


function changeIndex(elementId){
	for(var i=0;i<allIndexLists.length;i++){
		document.getElementById(allIndexLists[i]).style.visibility = "hidden";
		document.getElementById(allIndexLists[i]+"Button").className = "nonChoosen";
	}
	document.getElementById(elementId).style.visibility = "visible";
	document.getElementById(elementId+"Button").className = "choosen";
	
}


//window.setInterval(tjekUrl,100)
function tjekUrl(){
	//alert(window.location.hash)
	if("#"+currentElement != winLoc.hash){
		window.status = winLoc.hash;
		//doBack()
	}
}

function toggleDetails(elementId){
	var imgElement = document.getElementById(elementId.replace("div|","img|"));
	var element = document.getElementById(elementId);
	
	if(element.className == "detailsVisible"){
		setDetailCookie(elementId,false);
		element.className = "hiddenElement";
		imgElement.src = "OrteliusAjax/foldud.gif";
	}else{
		setDetailCookie(elementId,true);
		element.className = "detailsVisible";
		imgElement.src = "OrteliusAjax/foldind.gif";
	}
}



function toggleTreeElement(elementId){
	
	//change open / close ikon

	var imgElement = document.getElementById(elementId.replace("div|","img|"));
	
	element = document.getElementById(elementId);
	if(element.className == "packageTreeVisible"){
		element.className = "hiddenElement";
		imgElement.src = "OrteliusAjax/foldud.gif";
	}
	else{
		imgElement.src = "OrteliusAjax/foldind.gif";
		element.className = "packageTreeVisible";
	}
	}
	
function showHideAllTreeElement(doShow){
	
	}

	function showElement(elementId) {
	   // alert(elementId);
	if(elementId.indexOf("#")==0){
		var url = elementId.replace("#","");
		window.open("http://www.google.com/search?q="+url+"+Actionscript");
		return;
	}
	
	
	//remove highlights
	for(var i=0;i<currentPath.length;i++){
		document.getElementById(currentPath[i]).className = "nonChoosen";
	}
	currentPath= new Array();
	
	//highlight packagepath
	var elementParts = elementId.split(".");
	var elementIdTemp = "a|";
	for(var i=0;i<elementParts.length-1;i++){
		elementIdTemp+=elementParts[i];
		
		if(document.getElementById(elementIdTemp)){
			document.getElementById(elementIdTemp).className = "choosen";
			currentPath.push(elementIdTemp);	
		}
		
		elementIdTemp+="_"
	}
	
	//document.body.innerHTML += "<a name=\""+elementId+"\"></a>";
	
	winLoc.hash = "#"+elementId
	
	//alert(winLoc.hash)
	
	//window.event.returnValue=false;
	//history.forward()
		
	if(elementId!=null){
		getElement(elementId)
		layerHistory.push(currentElement);
		currentElement = elementId

		//marker knap
		if(document.getElementById(elementId+"Button")){			
			if(currentButtons[0] !=null) document.getElementById(currentButtons[0]).className = "nonChoosen"
			currentButtons[0] = elementId+"Button"
			document.getElementById(currentButtons[0]).className = "choosen";
			//
			
			if(currentButtons[1] !=null) document.getElementById(currentButtons[1]).className = "nonChoosen"
			currentButtons[1] = elementId+"ByName"
			document.getElementById(currentButtons[1]).className = "choosen"
			//
			
			if(currentButtons[2] !=null) document.getElementById(currentButtons[2]).className = "nonChoosen"
			currentButtons[2] = elementId+"ByTime"
			document.getElementById(currentButtons[2]).className = "choosen"
			}
		}
		
		
		return false;
	}


	
	function goBack(){	
		//history.back();
		elementId = layerHistory.pop();	
		showElement(elementId);
		layerHistory.pop();	
	}
	

//COOKIE STUFF///////////////////////////////

function setDetailCookie(elementId,isShowened){
	
for(var i=0;i<shownHiddenDetails.length;i++){
		if(shownHiddenDetails[i].name == elementId)	shownHiddenDetails[i].show=isShowened;
	}
}


function updateDetails(){
	for(var i=0;i<shownHiddenDetails.length;i++){
	    if (shownHiddenDetails[i].name.indexOf("showInherited")!=-1) {
	        showHideInherited(shownHiddenDetails[i].show,shownHiddenDetails[i].name.replace("showInherited_",""));
         }
        else if (document.getElementById(shownHiddenDetails[i].name)) {
	        document.getElementById(shownHiddenDetails[i].name).className = (shownHiddenDetails[i].show) ? "detailsVisible" : "hiddenElement";
	        document.getElementById(shownHiddenDetails[i].name.replace("div|", "img|")).src = (shownHiddenDetails[i].show) ? "OrteliusAjax/foldind.gif" : "OrteliusAjax/foldud.gif";
	    }
	}	
}


	
//AJAX stuff ////////////////////////////////	
function getElement(elementId)
{
	
xmlHttp=GetXmlHttpObject();

if (xmlHttp==null){
return
} 
url="ortfiles/"+elementId+".html";//?sid="+Math.random()
//alert(url)
xmlHttp.onreadystatechange=stateChanged 
xmlHttp.open("GET",url,true);
xmlHttp.send(null);
}


function stateChanged() {
	
	if(xmlHttp.readyState != 4) return
	if(xmlHttp.responseText == null) return;

var svar = xmlHttp.responseText;

document.getElementById("content").innerHTML = svar;
updateDetails();
} 

function GetXmlHttpObject()
{ 
var objXMLHttp=null
if (window.XMLHttpRequest)
{
objXMLHttp=new XMLHttpRequest()
}
else if (window.ActiveXObject)
{
objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
}
return objXMLHttp
}

function toggleIsInherited(type) {
    for (var i = 0; i < shownHiddenDetails.length; i++) {
        if (shownHiddenDetails[i].name == "showInherited_"+type) {
            //alert(shownHiddenDetails[i].show==true)
            showHideInherited(!shownHiddenDetails[i].show,type);
        }
    }
}

function showHideInherited(show,type) {
if(type == undefined) return;
    selectorText = ".isInherited_"+type;
   // alert(selectorText)
    setDetailCookie("showInherited_"+type, show);
    var theRules = new Array();
    if (document.styleSheets[0].cssRules) {
        theRules = document.styleSheets[0].cssRules;
    } else if (document.styleSheets[0].rules) {
        theRules = document.styleSheets[0].rules;
    }
    for (n in theRules) {
        if (theRules[n].selectorText == selectorText) {
            theRules[n].style.display = (show) ? 'table-row' : 'none';
        }
    }
    changeToggleInheritedText(show,type);
  }


  function changeToggleInheritedText(show,type) { 
	if(document.getElementById("btn_"+type)==undefined) return;
  document.getElementById("btn_"+type).innerHTML = (show) ? 'Hide inherited elements' : 'Show inherited elements';
  return;
  }

