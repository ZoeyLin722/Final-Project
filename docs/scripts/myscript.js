// add your JavaScript/D3 to this file
const width = 400;
const height = 600;
const radius = Math.min(width, height - 100) / 2; 

const svg = d3.select("div#plot")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("text")
  .attr("x", width / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Property Types by Year Built Group");

const g = svg.append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2 - 50})`);

const colors = ["#2E8B57", "#FF7F50", "#DAA520"]; 
const labels = ["TCHC", "Social Housing", "Private"]; 

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

const pie = d3.pie()
  .value(d => d);

const year1Data = [37, 21, 1213];
const year2Data = [39, 10, 1065];
const year3Data = [257, 202, 727];

function updatePieChart(data, label) {
  const pieData = pie(data);

  const paths = g.selectAll("path")
    .data(pieData);

  paths.enter()
    .append("path")
    .merge(paths)
    .transition()
    .duration(750)
    .attr("d", arc)
    .attr("fill", (d, i) => colors[i % colors.length]);

  paths.exit().remove();

  const text = g.selectAll("text")
    .data(pieData);

  text.enter()
    .append("text")
    .merge(text)
    .transition()
    .duration(750)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(d => d.data);

  text.exit().remove();

  svg.select(".center-text").remove();
  svg.append("text")
    .attr("class", "center-text")
    .attr("x", width / 2)
    .attr("y", height / 2 - 50)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(label);

  const legend = svg.selectAll(".legend")
    .data(labels)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(0, ${height - 100 + i * 20})`);

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d, i) => colors[i]);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(d => d);
}

// Initialize with the first year's data
updatePieChart(year1Data, 'Early period');
