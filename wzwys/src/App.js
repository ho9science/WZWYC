import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import React, { useState, useEffect } from "react";

const width = 1060;
const height = 500;
const country = getCountryLabel();

async function getCountryLabel() {
  var country = {};
  fetch("country.json")
  .then((response) => response.json())
  .then((data) => (country = data));
  return country;
}

function getSectionMap(d3, svg) {
  d3.json("section.json").then(function (data) {
    svg
      .append("g")
      .selectAll("polygon")
      .data(data.Polygons)
      .enter()
      .append("polygon")
      .attr("points", function (d) {
        return d.points
          .map(function (d) {
            return [d.x, d.y].join(",");
          })
          .join(" ");
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
    svg
      .selectAll("text")
      .data(data.Polygons)
      .enter()
      .append("text")
      .attr("class", "zone_label")
      .attr("x", function (d) {
        return d.center.x;
      })
      .attr("y", function (d) {
        return d.center.y;
      })
      .text(function (d) {
        return d.name;
      });
  });
}

function getWorlMap(g, path) {
  d3.json("world-110m2.json").then(function (topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path);
  });
}

function handleMouseClick() {
  var clicked_name = this.name;
  const random = Math.floor(Math.random() * country[clicked_name].length);

  alert("당신은 구역" + clicked_name + "를 선택하셨습니다.");
  alert(country[clicked_name][random] + "에서 태어났습니다.");
}

const initializeD3 = () => {
  var svg = d3
    .select("#main")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg.append("g");
  var projection = d3
    .geoMercator()
    .center([0, 35])
    .scale(135)
    .rotate([-160, 0]);
  var path = d3.geoPath().projection(projection);

  getSectionMap(d3, svg);
  getWorlMap(g, path);
}

function App() {

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
      <div id="main" ref={initializeD3}></div>
    </div>
  );
}

export default App;
