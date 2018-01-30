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

var ICON_DIM	= 5;
var METADATA_PADDING	= 10;

var iconGrid	= [new Array(ICON_DIM), new Array(ICON_DIM), new Array(ICON_DIM), new Array(ICON_DIM), new Array(ICON_DIM)];

var GRAY		= "gray";

function buildGrid(works, collection)
{
    metadataDiv     = document.getElementById("metadata");
		metadataDiv.style.width	= "0px";

    var body = document.body;

    var rootContainer = document.getElementById("grid");
    var x=0, y=0;

    for (var i = 0; i < works.length; i++)
	{
        if ((i > 0) && ((i % ICON_DIM) == 0))
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
			thatIcon.onclick = function(){
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
			thatIcon[name]		= value;
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
//        table.setAttribute("border", 1);
        table.setAttribute("cellspacing", 2);
    //	table.setAttribute("width", "100%")
        var tbody			= document.createElement("tbody");
    //	alert(icon);
        table.appendChild(tbody);

        for (var j = 0; j < attrNames.length; j++)
        {
            var label = attrNames[j];
    //		alert(label);
            tbody.appendChild(metadataPair(label, icon[label], "right", 150));
        }

				metadataDiv.style.top	= icon.offsetTop + "px";
				metadataDiv.appendChild(table);
				var metadataX;
				if (icon.xGrid < 2)
				{
	        var leftIcon		= iconGrid[0][icon.yGrid];
	        metadataX				= leftIcon.offsetLeft - table.offsetWidth - METADATA_PADDING;
				}
				else {
					var rightIcon		= iconGrid[ICON_DIM - 1][icon.yGrid];
					metadataX				= rightIcon.offsetLeft + rightIcon.offsetWidth + METADATA_PADDING;
				}
    //	alert("yo! " + leftIcon.offsetLeft +","+table.offsetWidth + "," + newLeft);
        metadataDiv.style.left	= metadataX + "px";
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
//        if (!((iconLeft < event.x) && (iconLeft + icon.width > event.x) && (iconTop < event.y) && (iconTop + icon.width > event.y)))
				if (true)
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
	exhibitImg.src			= "";
//	exhibitImg.setAttribute("src", null);

	exhibit.style.visibility= "hidden";
	exhibit.removeChild(footer);
	bottom.appendChild(footer);
	bottom.style.visibility	= "visible";
}

function metadataPair(label, value)
{
	var thatTD	= document.createElement("td");
	thatTD.style.align	= "right";
	thatTD.innerHTML		= label + NBSP;

	var thatTR			= document.createElement("tr");
	thatTR.style.align	= "left";
	thatTR.appendChild(thatTD);

	thatTD	= document.createElement("td");
//	thatTD.style.align			= "left";
	thatTD.setAttribute("align", "left");
	thatTD.style.fontStyle	= "italic";
	if (label == "title")
			thatTD.style.fontWeight	= "bold";
	thatTD.innerHTML				= value;

	thatTR.appendChild(thatTD);

	return thatTR;
}
