// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append an SVG group that will hold our chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function (censusData) {
    console.log(censusData)
    // Step 1: Cast data as numbers
    censusData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    // Step 2: Create scale functions
    var xlinearscale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.poverty) * .9, d3.max(censusData, d.poverty) * 1.1])
        .range([0, width])

    var ylinearscale = d3.scaleLinear()
        .domain([2, d3.max(censusData, d => d.healthcare)])
        .range([height,0])
};