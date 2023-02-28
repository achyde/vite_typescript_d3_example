import './style.css'
import * as d3 from 'd3';

const d3_height_width = 200;
const max_point_value = 100;
const d3_target = document.querySelector<HTMLDivElement>('#d3-target')!
const xScale = d3.scaleLinear().domain([0, max_point_value]).range([ 0, d3_height_width ]);
const yScale = d3.scaleLinear().domain([0, max_point_value]).range([ d3_height_width, 0 ]);
const pointsGroup = d3.select(d3_target).append('svg').attr('width', `${d3_height_width}`).attr('height', `${d3_height_width}`).append('g');
const NUMBER_OF_POINTS = 4;
const points:{x:number, y:number, color:string}[] = [];

const randomColor = () => Math.floor(Math.random()*16777215).toString(16);
setInterval(() => {

    //update the points position so the move around
    points.forEach((item) => {
        item.x = Math.floor(Math.random() * 100)
        item.y = Math.floor(Math.random() * 100)
    });

    //add a new point at random position
    points.push({x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100), color: randomColor()});

    //remove the first point if we have more than NUMBER_OF_POINTS, rolling the array
    if(points.length > NUMBER_OF_POINTS) {
        points.shift();
    }

    pointsGroup
        .selectAll<SVGElement, {x:number, y:number, color:string}>('circle')
        .data(points, (d) => JSON.stringify(d))
        .join(
            (enter) => {

                const enterItem = enter.append("circle");
                enterItem.style("stroke", `red`)
                    .style("stroke-width", 3)
                    .style("stroke-dasharray", "2,2")
                    .style("fill", (d) => `#${d.color}`)
                    .attr("r", 0)
                    .attr("cx", (d) => xScale(d.x) )
                    .attr("cy", (d) => yScale(d.y) )
                    .transition()
                    .duration(500)
                    .attr("r", 5.5);

                return enterItem;
            },
            (update) => {
                return update.style("stroke", (d) => `#${d.color}`)
                    .style("stroke-width", 3)
                    .style("stroke-dasharray", "")
                    .transition()
                    .duration(Math.floor(Math.random() * 800))
                    .ease( d3.easeSin)
                    .attr("cx", (d) => xScale(d.x) )
                    .attr("cy", (d) => yScale(d.y) );
            },
            (exit) => {
                return exit.style("stroke", `navy`)
                    .style("stroke-dasharray", "2,2")
                    .transition()
                    .duration(1000)
                    .attr("r", 0)
                    .remove();
            }
        )
}, 1000);
