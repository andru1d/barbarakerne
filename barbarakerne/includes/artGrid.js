/**
 * @author andruid
 */
var NBSP	= "&nbsp;";

var attrNames	= ["title", "medium", "size" /*, "place", "date" */];

var closeIcon	= document.createElement("img");
closeIcon.setAttribute("class", "closeIcon");
closeIcon.src	= "images/closeIcon.png";
closeIcon.id	= "closeIcon";
closeIcon.align	= "right";

var closeA		= document.createElement("a");
closeA.setAttribute("href", "javascript:closeImage();");
closeA.appendChild(closeIcon);

var title	= document.createElement("div");
title.setAttribute("class", "title");

var exhibitImg	= document.createElement("img");
	
var bottom, footer;

var iconGrid	= [new Array(5), new Array(5), new Array(5), new Array(5), new Array(5)];

var GRAY		= "gray";

function buildGrid()
{
    var xml = loadXML("barbaraKerneImages.xml");
    //alert(xml);
    
    var paintings = xml.getElementsByTagName(collection);
  
    var body = document.body;
    
    var rootContainer = document.getElementById("grid");
    var x=0, y=0;
	
    for (var i = 0; i < paintings.length; i++) 
	{
        if ((i > 0) && ((i % 5) == 0)) 
		{
            var br = document.createElement("br");
            rootContainer.appendChild(br);
			y++;
			x	= 0;
        }

        var thatPainting	= paintings[i];
		var thatIcon		 = document.createElement("img");
		thatIcon.className = "icon";
			
		if (thatPainting.getAttribute("title") == "gray") 
		{
			thatIcon.src	= "prints/icons/gray.png";
			thatIcon.setAttribute("class", "no_icon");
		}
		else 
		{
			thatIcon.painting = thatPainting;
			for (var j = 0; j < attrNames.length; j++) {
				var label = attrNames[j];
				if (thatPainting) 
					mapAttr(thatPainting, label, thatIcon);
			}
			
			thatIcon.src = collection + "s/icons/" + thatPainting.getAttribute("icon"); // create referentiality!!!
			//	thatIcon.setAttribute("image", thatPainting.getAttribute("image"));
			thatIcon.image = thatPainting.getAttribute("image");
			thatIcon.title = thatPainting.getAttribute("title");
			
			thatIcon.onmouseover = function(){
				showMetadata(this);
			};
			thatIcon.onmouseout = function(){
				hideMetadata(this);
			};
			thatIcon.onmousedown = function(){
				showImage(this);
			};
		}

		thatIcon.xGrid		= x;
		thatIcon.yGrid		= y;
 		iconGrid[x++][y]	= thatIcon;
        rootContainer.appendChild(thatIcon);
    }
	bottom	= document.getElementById("bottom");
	footer	= document.getElementById("footer");
	
	var cNameDiv	= document.getElementById("collection_name");
	cNameDiv.innerHTML = "P" + collection.substring(1) + "s";
}

function mapAttr(thatPainting, name, thatIcon)
{
		var value			= thatPainting.getAttribute(name);
		if (value)
			thatIcon[name]		= value.replace(/ /g, NBSP);
}

function metadataDiv()
{
	return document.getElementById("metadata");
}

function showMetadata(icon)
{
	var table			= document.createElement("table");
	table.setAttribute("border", 0);
	table.setAttribute("cellspacing", 2);
//	table.setAttribute("width", "100%")
	var tbody			= document.createElement("tbody");
//	alert(icon);
	table.appendChild(tbody);
	
	for (var j = 0; j < attrNames.length; j++)
	{
		var label = attrNames[j];
//		alert(label);
		tbody.appendChild(metadataPair(label + ":"+ NBSP + NBSP, icon[label], "right", 150));
	}

	var thatDiv			= metadataDiv();
	var leftIcon		= iconGrid[0][icon.yGrid];
	thatDiv.style.top	= leftIcon.offsetTop + "px";
	thatDiv.appendChild(table);
	var newLeft			= leftIcon.offsetLeft - table.offsetWidth - 17;
//	alert("yo! " + leftIcon.offsetLeft +","+table.offsetWidth + "," + newLeft);
	thatDiv.style.left	= newLeft + "px";
//	alert("yo! " + leftIcon.offsetLeft +","+table.offsetWidth + "," + thatDiv.offsetLeft);
}

function hideMetadata(icon)
{
	metadataDiv().innerHTML	= "";
}

function showImage(thatIcon)
{
	var src = collection + "s/images/" + thatIcon.painting.getAttribute("image");
	exhibitImg.setAttribute("src", src);
	
	title.innerHTML	= thatIcon.title;
	
	var exhibit	= document.getElementById("exhibit");
	
	if (exhibit.firstChild == null)
	{
		exhibit.appendChild(closeA);
		exhibit.appendChild(title);
		exhibit.appendChild(exhibitImg);
	}
	bottom.style.visibility	= "hidden";
	bottom.removeChild(footer);
	exhibit.appendChild(footer);
	exhibit.style.zIndex	= 2;
	exhibit.style.visibility= "visible";
}

function closeImage()
{
	var exhibit	= document.getElementById("exhibit");

//	exhibit.removec	
	exhibit.style.zIndex	= -1;
	exhibitImg.src			= null;
	exhibitImg.setAttribute("src", null);
	
	exhibit.style.visibility= "hidden";
	exhibit.removeChild(footer);
	bottom.appendChild(footer);
	bottom.style.visibility	= "visible";
}

function metadataPair(label, value, labelAlign, labelWidth)
{
	var thatTD	= document.createElement("td");
	if (labelAlign) 
	{
		thatTD.setAttribute("align", labelAlign);
		thatTD.setAttribute("style", "font-weight: normal;");
	}
	if (false)
	{
		thatTD.setAttribute("width", labelWidth);
	}
	thatTD.innerHTML	= label;

	var thatTR			= document.createElement("tr");
	thatTR.setAttribute("valign", "top");
	thatTR.appendChild(thatTD);
	thatTD	= document.createElement("td");
	thatTD.setAttribute("align", "left");
	thatTD.innerHTML	= value;
	thatTR.appendChild(thatTD);
	
	return thatTR;
}