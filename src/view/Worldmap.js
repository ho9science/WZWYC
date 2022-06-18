import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";

const width = 1060;
const height = 500;
var country = {};
const Worldmap = ({ data }) => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const svgRef = useRef(null);
  const countryData = data[0];
  const sectionData = data[1];
  const worldMapData = data[2];

  country = getCountryLabel();

  useEffect(() => {
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl.attr("width", width).attr("height", height);

    const g = svg.append("g");
    const projection = d3
      .geoMercator()
      .center([0, 35])
      .scale(135)
      .rotate([-160, 0]);
    const path = d3.geoPath().projection(projection);

    getSectionMap(svg);
    getWorldMap(g, path);
  }, []);

  function getCountryLabel() {
    return countryData;
  }
  // section
  function getSectionMap(svg) {
    svg
      .append("g")
      .selectAll("polygon")
      .data(sectionData.Polygons)
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
        return d.name.toLowerCase();
      })
      .attr("fill", "transparent")
      .on("click", handleMouseClick);
    svg
      .selectAll("text")
      .data(sectionData.Polygons)
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
  }
  // world map
  function getWorldMap(g, path) {
    const topology = worldMapData;
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path);
  }

  function handleMouseClick() {
    var clicked_name = this.getAttribute("name");
    const random = Math.floor(Math.random() * country[clicked_name].length);
    setSelectedZone(clicked_name);
    setSelectedCountry(country[clicked_name][random]);
    handleOpen();
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <svg id={"main"} ref={svgRef}></svg>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>"{selectedZone}" 존을 선택하셨습니다.</DialogTitle>
        <ListItemText>{selectedCountry}에서 태어났습니다.</ListItemText>
      </Dialog>
    </>
  );
};

export default Worldmap;