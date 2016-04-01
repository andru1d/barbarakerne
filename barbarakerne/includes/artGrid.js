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

function buildGrid(works, collection)
{
    metadataDiv     = document.getElementById("metadata");
    
    var body = document.body;
    
    var rootContainer = document.getElementById("grid");
    var x=0, y=0;
	
    for (var i = 0; i < works.length; i++) 
	{
        if ((i > 0) && ((i % 5) == 0)) 
		{
//            var br = document.createElement("br");
//            rootContainer.appendChild(br);
			y++;
			x	= 0;
        }

        var thatPainting	= works[i];
		var thatIcon		 = document.createElement("img");
		thatIcon.className = "icon";
			
		if (thatPainting.title == "gray") 
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
			
			thatIcon.src = collection + "s/icons/" + thatPainting.icon; // create referentiality!!!
			//	thatIcon.setAttribute("image", thatPainting.image);
			thatIcon.image = thatPainting.image;
			thatIcon.title = thatPainting.title;
            
            thatIcon.showing    = false;
			
			thatIcon.onmouseover = function(){
				showMetadata(event, this);
			};
			thatIcon.onmouseout = function(){
				hideMetadata(event, this);
			};
			thatIcon.onmousedown = function(){
				showImage(this, collection);
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
		var value			= thatPainting[name];
		if (value)
			thatIcon[name]		= value.replace(/ /g, NBSP);
}

var metadataDiv;

var currentIcon;

function showMetadata(event, icon)
{
    if (!icon.showing && (currentIcon != icon))
    {
        icon.showing        = true;
        currentIcon         = icon;
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

        var leftIcon		= iconGrid[0][icon.yGrid];
        metadataDiv.style.top	= leftIcon.offsetTop + "px";
        metadataDiv.appendChild(table);
        var newLeft			= leftIcon.offsetLeft - table.offsetWidth - 17;
    //	alert("yo! " + leftIcon.offsetLeft +","+table.offsetWidth + "," + newLeft);
        metadataDiv.style.left	= newLeft + "px";
    //	alert("yo! " + leftIcon.offsetLeft +","+table.offsetWidth + "," + thatDiv.offsetLeft);        
        metadataDiv.style.visibility='visible'
    }
}

function hideMetadata(event, icon)
{
    if (icon.showing && (currentIcon == icon))
    {
        var iconLeft    = icon.x;
        var iconTop     = icon.y;
        if (!((iconLeft < event.x) && (iconLeft + icon.width > event.x) && (iconTop < event.y) && (iconTop + icon.width > event.y)))
        {
            metadataDiv.style.visibility='hidden'
            //metadataDiv().innerHTML	= "";
            while (true)
            {
                var last = metadataDiv.lastChild;
                if (!last)
                    break;
                metadataDiv.removeChild(last);
            }
            icon.showing    = false;
            currentIcon     = null;
        }
    }
}

function showImage(thatIcon)
{
	var src = collection + "s/images/" + thatIcon.painting.image;
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