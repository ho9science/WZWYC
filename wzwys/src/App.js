import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import * as topojson from "topojson-client";

function App() {
  var width = 1060,
  height = 500;

var projection = d3.geoMercator()
  .center([0, 35])
  .scale(135)
  .rotate([-160, 0]); 

var svg = d3.select('#main').append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("section.json").then(function (data) {
  svg.append("g").selectAll("polygon")
      .data(data.Polygons)
      .enter().append("polygon")
      .attr("points", function (d) {
          return d.points.map(function (d) { return [d.x, d.y].join(","); }).join(" ");
      })
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("name", function (d) {
          return d.name;
      })
      .attr("class", function (d) {
          return d.name;
      })
      .attr("fill", "transparent")
      .on("click", handleMouseClick);
  svg.selectAll("text")
      .data(data.Polygons)
      .enter()
      .append("text")
      .attr("class", "zone_label")
      .attr("x", function(d){return d.center.x})
      .attr("y", function(d){return d.center.y})
      .text(function (d) { return d.name; });
});

var g = svg.append("g");

var path = d3.geoPath()
  .projection(projection);

d3.json("world-110m2.json").then(function (topology) {
  g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter().append("path")
      .attr("d", path);
});

var country = {};
fetch("country.json").then((response) => response.json())
.then((data) => country = data);

function handleMouseClick() {
  var clicked_name = d3.select(this).attr("name");
  const random = Math.floor(Math.random() * country[clicked_name].length);
  
  alert("당신은 구역" + clicked_name + "를 선택하셨습니다.");
  alert(country[clicked_name][random]+"에서 태어났습니다.");
  
}

function handleMouseOver() {
  d3.select(this).style("fill", "red");
}

function handleMouseOut() {
  d3.select(this).style("fill", "none");
}

  return (
    <div className="">
        <h1>
          다시 태어난다면
          <br />
          <span>— 어느 구역에서 태어나시겠습니까? </span>
          <span role="img" aria-label="Party popper emojis">
          🗺️
          </span>
        </h1>
        <div id="main"></div>
    </div>
  );
}

export default App;
