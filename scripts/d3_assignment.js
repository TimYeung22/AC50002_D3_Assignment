var width = 1500;
	height = 2000;
var map = document.getElementById("map");
var addsvg = d3.select(".map").append("svg").attr("width", width).attr("height", height);
var svg = d3.select("svg");
var projection = d3.geoMercator().scale(5500).center([-7,60]);
var pathGenerator = d3.geoPath().projection(projection);
var ukmap = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-counties.json';
d3.json(ukmap).then(data =>{ 
	console.log(data);
	var cities = topojson.feature(data, data.objects.GBR_adm2);
	svg.selectAll("path").data(cities.features).enter().append("path").attr("d", pathGenerator);
	console.log(cities.features); 	 	
});
function ChangeSlider(n){
	var slidervalue =  document.getElementById("SizeSlider").value;
	document.getElementById("SizeSlider").value = parseInt(slidervalue) + n;
	UpdateValue();
}
function showTooltip(x,y,text){
	console.log(text);
	let tooltip = document.getElementById("Tooltip");
	tooltip.innerHTML = "<text>"+text+"</text>";
	tooltip.style.display = "block";
	tooltip.style.left = x + "px";
	tooltip.style.top = y + 140 + "px";
}
function hideToolTip(){
	let tooltip = document.getElementById("Tooltip");
	tooltip.style.display = "none";
}
function UpdateValue(){
	var slidervalue =  document.getElementById("SizeSlider").value;
	var sliderDisplay = document.getElementById("slidernum");
	sliderDisplay.innerHTML = slidervalue;
}
function CreateTowns(){
	var slidervalue =  document.getElementById("SizeSlider").value;
	var datalink = 'http://34.78.46.186/Circles/Towns/'+slidervalue;
	svg.selectAll("circle").transition().duration(300).style("opacity", 0);
	svg.selectAll("circle").remove();
	d3.json(datalink).then(function(d){
		svg.selectAll("circle").data(d).enter().append("circle")
		.attr("cx", function(data){var coords = projection([data.lng,data.lat]); return coords[0];})
		.attr("cy", function(data){var coords = projection([data.lng,data.lat]); return coords[1];})
		.attr("r", function(data){var Psize = 1+2*Math.sqrt(data.Population/10000); return Psize;})
		.attr("onmousemove", function(data){var coords = projection([data.lng,data.lat]);var msg = "showTooltip("+coords[0]+","+coords[1]+","+'"Town Name: '+data.Town+"<br>Population: "+data.Population+'");'; return msg;})
		.attr("onmouseout", function(data){var msg = "hideToolTip();"; return msg;})
		.style("opacity", 0)
		.transition()
		.duration(300)
		.style("opacity", 0.7)
	});
}
window.onload=UpdateValue();
window.onload=CreateTowns();

