/**
 * Interface Ecology Lab XML tools
 * http://ecologylab.cs.tamu.edu
 */
function getXMLParser()
{
   return (document.implementation && document.implementation.createDocument) ?
      document.implementation.createDocument("", "", null) :
      new ActiveXObject("Microsoft.XMLDOM");
}
function loadXML(xmlURL)
{
	var request = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
    request.open('GET', xmlURL, false);
    request.setRequestHeader('Content-Type', 'text/xml')
    request.send('');
	
  	return request.responseXML;
}   

function buildDOM(xmlString)
{
   var dom;
   
   if (document.implementation && document.implementation.createDocument)
   {
	  var parser = new DOMParser();
	  dom = parser.parseFromString(xmlString, "text/xml");
   }
   else
   {
      dom = new ActiveXObject("Microsoft.XMLDOM");
	  dom.async = false;
	  dom.loadXML(xmlString);
   }
   return dom;
}

var xmlDoc = self.XMLSerializer ? buildDOM("<root></root>") : new ActiveXObject("Msxml2.DOMDocument.3.0");

function xmlToString(xml)
{
   if (self.XMLSerializer)
   {
	  return (new XMLSerializer()).serializeToString(xml);
   }
   else
   {
//	  var axDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
	  var frag  = xmlDoc.createDocumentFragment();
	  frag.appendChild(xml);
	  return frag.xml;
   }
}
function xmlString()
{
   return xmlToString(this);
}
