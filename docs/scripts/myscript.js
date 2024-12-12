// add your JavaScript/D3 to this file

const width = 600;  
const height = 600;
const radius = Math.min(width - 200, height - 100) / 2; 

const svg = d3.select("div#plot")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("text")
  .attr("x", (width - 200) / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Property Types by Year Built Group");

const g = svg.append("g")
  .attr("transform", `translate(${(width - 200) / 2}, ${height / 2 - 50})`);

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
    .attr("x", (width - 200) / 2)
    .attr("y", height / 2 - 50)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(label);

  //legend
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
  
  // text
  svg.selectAll(".long-text").remove();
  svg.append("foreignObject")
    .attr("class", "long-text")
    .attr("x", width - 180)  
    .attr("y", 50)
    .attr("width", 180)
    .attr("height", height - 100)
    .append("xhtml:body")
    .style("font-size", "12px")
    .html(`<p>This chart illustrates the distribution of property types across different year groups, categorized into three property types: Private Apartments, TCHC, and Social Housing. To better present the results, the building construction periods are divided into three distinct timeframes: the Recent Period (1956–2023), the Mid Period (1881–1955), and the Early Period (1805–1880). By interacting with the buttons for each period, you can observe changes in the pie chart, showcasing the evolution of property types over time. This visualization highlights the shifts in construction trends and the prevalence of different property types during each period.</p>`);
}

// initialize
updatePieChart(year3Data, 'Recent period');
