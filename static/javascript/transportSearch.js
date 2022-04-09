/**
async attribute allows the browser to continue to parse the remainder of your page while the API loads. Once it has loaded, the browser will pause and immediately execute the script. 
const element = document.getElementById("button"); 
https://www.google.com/maps/embed/v1/search?key=AIzaSyAyIxVTSvRTgAXXBOgUbkwasimuxWlqMaQ&q=Space+Needle,Seattle+WA
*/
//var iframe = document.getElementById('map');


function reloadMap() { //execute after 'search' button is pressed.
	//var iframe = document.getElementById("myFrame");
	//var url = iframe.src;

	//console.log(url);

	//document.getElementById('calendar').src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAyIxVTSvRTgAXXBOgUbkwasimuxWlqMaQ&q=Space+Needle,Seattle+WA";

	var destination = document.getElementById('destination').value; //Get text in input box. For destination.
	var leavingFrom = document.getElementById('leavingFrom').value;
	console.log(leavingFrom+" "+destination);
	//document.getElementById('map').

	var mapMode = "place";
	/*
	You can specify one of the following map modes to use in your request URL:
		place: displays a map pin at a particular place or address, such as a landmark, business, geographic feature, or town.
		directions: displays the path between two or more specified points on the map, as well as the distance and travel time.
		search: shows results for a search across the visible map region.
	*/
	//if else to set mapMode depending on whether user has keyed in input.
	if (leavingFrom == "" && destination != ""){
		//only destination entered
		mapMode = "place";
		var search = destination.replace(/\s/g, "+"); //string with + in the spaces\
		//var index = document.getElementById('map').src.lastIndexOf("=");
		document.getElementById('map').src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAyIxVTSvRTgAXXBOgUbkwasimuxWlqMaQ&q=" + search;
	
	} else if (leavingFrom != "" && destination == ""){
		mapMode = "place";
		var search = leavingFrom.replace(/\s/g, "+"); //string with + in the spaces
		//var index = document.getElementById('map').src.lastIndexOf("=");
		document.getElementById('map').src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAyIxVTSvRTgAXXBOgUbkwasimuxWlqMaQ&q=" + search;
	
	} else if (leavingFrom != "" && destination != ""){
		mapMode = "directions";
		var search1 = leavingFrom.replace(/\s/g, "+"); //string with + in the spaces
		var search2 = destination.replace(/\s/g, "+");
		var transportType = getTransportType();
		if (transportType != "Mode of Transport:")
			document.getElementById('map').src = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAyIxVTSvRTgAXXBOgUbkwasimuxWlqMaQ&origin=" + search1 + "&destination=" + search2 + "&mode=" + transportType;
		//console.log(search);
	}
	
}

function getTransportType(){
	var transObj = document.getElementById("transport_type");
	var result = transObj.options[transObj.selectedIndex].value;
	console.log(result);
	return result;
}
