import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";

const width = 950;
const height = 500;

const Worldmap = ({ country, section, world }) => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [open, setOpen] = React.useState(false);

  const svgRef = useRef(null);

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

  // section
  function getSectionMap(svg) {
    svg
      .append("g")
      .selectAll("polygon")
      .data(section.Polygons)
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
      .data(section.Polygons)
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
    const topology = world;
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