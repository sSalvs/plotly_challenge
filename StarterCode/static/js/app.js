// read in samples.json.




d3.json("static/samples.json").then((data) => {
  console.log(data.samples[0]);

function barChart(personID){
  var samples = personID.samples;
  var samples_array = samples.filter(selected => selected.id = personID)
  var result = samples_array[0]
  console.log(result);
  var OTU_IDs = result.otu_ids
  console.log(OTU_IDs)
  var resultSampleValues = result.sample_value
  console.log(resultSampleValues)
  // var filteredSampleValues = resultSampleValues.slice(0,10)
  var resultLabels = result.otu_labels

//  Create the Traces
    var trace1 = {
      x: resultSampleValues,
      y: OTU_IDs,
      type: "bar",
      orientation: 'h'}

  var data = [trace1];

  var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample" },
    yaxis: { title: "OTU ID"}
  }; 


  Plotly.newPlot("bar", data, layout);

}

barChart(data);


});







// function create_plot(sample){
// d3.json("static/samples.json").then((data) => {
//   console.log(data.samples)
//   var samples = data.samples;
//   var samples_array = samples.filter(selected => selected.id = sample)
//   var result = samples_array[0]
//   console.log(samples_array);


//     //  Create the Traces
//     // var trace1 = {
//     //   x: data.samples.id,
//     //   y: data.samples.otu_ids.map(val => Math.sqrt(val)),
//     //   type: "box",
//     //   name: "Cancer Survival",
//     //   boxpoints: "all"
// })};
  
// console.log("hello")

 // Create the data array for the plot
//  var data = [trace1];

//  // Define the plot layout
//  var layout = {
//    title: "Square Root of Cancer Survival by Organ",
//    xaxis: { title: "Organ" },
//    yaxis: { title: "Square Root of Survival" }
//  };

//  // Plot the chart to a div tag with id "plot"
//  Plotly.newPlot("bar", data, layout);
// });