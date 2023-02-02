import './style.css'
import * as d3 from 'd3';

const d3_height_width = 200;
const d3_max_value = 100;
const d3_target = document.querySelector<HTMLDivElement>('#d3-target')!
const xScale = d3.scaleLinear().domain([0, d3_max_value]).range([ 0, d3_height_width ]);
const yScale = d3.scaleLinear().domain([0, d3_max_value]).range([ d3_height_width, 0 ]);
const pointsGroup = d3.select(d3_target).append('svg').attr('width', `${d3_height_width}`).attr('height', `${d3_height_width}`).append('g');

setInterval(() => {
    pointsGroup
        .selectAll<SVGElement, {x:number, y:number}>('circle')
        .data([{x: Math.floor(Math.random() * d3_max_value), y: Math.floor(Math.random() * d3_max_value)}])
        .join(
            (enter) => {
                return enter.append("circle")
                    .attr("cx", (d) => xScale(d.x) )
                    .attr("cy", (d) => yScale(d.y) )
                    .attr("r", 5.5)
                    .style("stroke", "black")
                    .style("fill", "#69b3a2");
            },
            (update) => {
                return update
                    .attr("cx", (d) => xScale(d.x) )
                    .attr("cy", (d) => yScale(d.y) );
            }
        )
}, 1000);
