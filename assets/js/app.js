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
        .domain([d3.min(censusData, d => d.poverty)*.9, d3.max(censusData, d => d.poverty)*1.1])
        .range([0, width])

    var ylinearscale = d3.scaleLinear()
        .domain([2, d3.max(censusData, d => d.healthcare)])
        .range([height, 0])

    // Step 3: Create axes

    var yAxis = d3.axisLeft(ylinearscale);
    var xAxis = d3.axisBottom(xlinearscale);

    //  Step 4: Append Axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

    // Step 5: Create Circles
    
    var circlesobject = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()    
        .append("circle")
        .attr("cx", d => xlinearscale(d.poverty))
        .attr("cy", d => ylinearscale(d.healthcare))
        .attr("r","15")
        .attr("opacity", ".5")
        .attr("fill", "blue");

//Step 6 Add labels to circles
var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");

circleLabels
  .attr("x", function(d) {
    return xlinearscale(d.poverty);
  })
  .attr("y", function(d) {
    return ylinearscale(d.healthcare);
  })
  .text(function(d) {
    return d.abbr;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "black");

// Step: 7 Create axes labels
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

}).catch(function(error) {
    console.log(error);
});