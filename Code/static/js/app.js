

// Create Bar and Bubble chart. Start with the bar chart and use existing data to create bubbles
function barChart(personID) {
  d3.json("static/samples.json").then((data) => {
    console.log(data);

    // find the sample data from the json file 
    var samples = data.samples;
    // filter depending on user imput 
    var samples_array = samples.filter(selected => selected.id == personID);
    var result = samples_array[0];
    // console.log(result);
    var OTU_IDs = result.otu_ids.slice(0, 10)
    var bubble_OTU_id = result.otu_ids;
    // console.log(OTU_IDs)
    var resultSampleValues = result.sample_values;
    // console.log(resultSampleValues)
    // var filteredSampleValues = resultSampleValues.slice(0,10)
    var resultLabels = result.otu_labels

    // add there we want to plot the chart on the HTML and then reset the location
    var barChartPlace = d3.select("#bar");
    barChartPlace.html("");

    //  Create the trace for bar 
    var trace1 = {
      x: resultSampleValues.slice(0, 10).reverse(),
      y: OTU_IDs.map(otuID => `OTU ${otuID}`).reverse(),
      text: resultLabels,
      type: "bar",
      orientation: 'h'
    }

    var data = [trace1];

    //  Create trace for bubble
    var trace2 = {
      x: bubble_OTU_id,
      y: resultSampleValues,
      mode: 'markers',
      marker: {
        color: bubble_OTU_id,
        size: resultSampleValues
      },
      text: resultLabels
    }

    var data2 = [trace2];

    var layout = {
      height: 600,
      width: 1200
    };

    // Plot graphs
    Plotly.newPlot("bar", data);
    Plotly.newPlot('bubble', data2, layout);


  });
}
// ########### Build the Demographic info


function metaDataBuild(demographics_id) {
  d3.json("static/samples.json").then((data) => {
    console.log(data);

    var metadata = data.metadata;
    var meta_array = metadata.filter(selected => selected.id == demographics_id);
    var result = meta_array[0]
    // define each demogrpahic info
    var ID = result.id;
    var ethnicity = result.ethnicity;
    var gender = result.gender;
    var age = result.age;
    var location = result.location;
    var bbtype = result.bbtype;
    var wfreq = result.wfreq;
    // console.log(ID)

    // Add where the info will go then reset 
    var metaDataPlace = d3.select("#sample-metadata");
    metaDataPlace.html("");

    // append the results to the metadata section 
    var ID_result = metaDataPlace.append("p").text(`id: ${ID}`);
    var ethnicity_result = metaDataPlace.append("p").text(`ethnicity: ${ethnicity}`);
    var gender_result = metaDataPlace.append("p").text(`gender: ${gender}`);
    var age_result = metaDataPlace.append("p").text(`age: ${age}`);
    var location_result = metaDataPlace.append("p").text(`location: ${location}`);
    var bbtype_result = metaDataPlace.append("p").text(`bbtype: ${bbtype}`);
    var wfreq_result = metaDataPlace.append("p").text(`wfreq: ${wfreq}`);
  });
}


function init() {
  // Get the data 
  d3.json("static/samples.json").then((data) => {
    var sample_names = data.names;
    console.log(sample_names);

    // add options to drop down menu 
    var dropDownSelector = d3.select("#selDataset");
    sample_names.forEach((sample) => {
      dropDownSelector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    barChart(940);
    // bubbleChart(940);
    metaDataBuild(940);
  });
}
// call function 
init();

// change results to next selection 
function optionChanged(nextSample) {
  console.log(nextSample);
  barChart(nextSample);
  // bubbleChart(nextSample);
  metaDataBuild(nextSample);
}