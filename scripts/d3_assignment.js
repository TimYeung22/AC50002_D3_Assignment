var svg;
function d3Draw(dataset){
Width=1000;
Height=800;
if ((typeof svg == 'undefined') ){
   svg= d3.select("body").append("svg")
   .attr("width",Width)
   .attr("Height",Height);
}
}
d3.json("countries.geojson",function(d){
	var uk = d3.select("ISO_A3").property("value", "GBR");
	console.log(uk);
	var group = svg.selectAll("geometry").data(d.coordinates).data(d.properties).enter().append("geometry");
	var projection = d3.geo.mercator().scale(2000);
	var path = d3.geo.path().projection(projection);
	var area = group.append("path").attr("d".path).attr("class","area").attr("fill","steelblue");
});

/*var circles=svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle");

circles.attr("cx", function(d){
    return d.x;
} )
.attr("cy",function(d){
    return d.y;
} )
.attr("r", function(d){
    return d.r;
} );  
   


function d3Update(dataset){

	var circles=svg.selectAll("circle")
	.data(dataset)
	.transition()
	.duration(500)
	.ease("bounce");

	circles.attr("cx", function(d){
	    return d.x;
	} )
	.attr("cy",function(d){
	    return d.y;
	} )
	.attr("r", function(d){
	    return d.r;
	} );  
	   
	}*/

function loadData(){


	d3.select("p")
	.on("click",function(){
		
		updateData();
	});
   d3.json("http://34.78.46.186/Circles/Towns/50",function(error,data){
   if (error){
      console.log(error)
   }else{
      d3Draw(data);
      }
   }
   );
}
 
function updateData(){
  
   d3.json("http://34.78.46.186/Circles/Towns/50",function(error,data){
   if (error){
      console.log(error)
   }else{
      d3Update(data);
      }
   }
   );
}

window.onload= loadData;

