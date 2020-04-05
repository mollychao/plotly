// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData

// function metaData(sample){

// }
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    var data=importedData;
    // filter sample values by id 
    var samples = data.samples;

    // create empty list
    // get sample with id 940
    // get value by key:otu_label, sample_value, otu_ids
    // get the first 10 values in sample_value, lbl,ids 
    // push values into the list
    // plot

    var sampleValues = [];
    var otuIds = [];
    var otuLabels = [];
    var resultArray = samples.filter(sampleObj => parseInt(sampleObj.id) == 940);
    sampleValues.push(resultArray[0]["sample_values"]);
    otuIds.push(resultArray[0]["otu_ids"]);
    otuLabels.push(resultArray[0]["otu_labels"]);

    var topSampleValues = sampleValues[0].slice(0,10).reverse();
    var topOtuIds = otuIds[0].slice(0,10).reverse();
    var topOtuLabels = otuLabels[0].slice(0,10).reverse();

    console.log(topSampleValues, topOtuIds);

    var trace = {
        x: topSampleValues,
        y: topOtuIds,
        text: topOtuLabels,
        color: 'rgb(142,124,195)',
        type:"bar",
        orientation: "h"
    };
    
    // create data variable
    var data = [trace];
    
    // create layout variable to set plots layout
    var layout = {
        title: "Top 10 OTU",
        yaxis: {
            type: 'category'
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    
    // create the bar plot
    Plotly.newPlot("bar", data, layout);


    var trace1 = {
        x: topOtuIds,
        y: topSampleValues,
        hovertext: topOtuLabels,
        mode: 'markers',
        marker: {
            size: topSampleValues,
            color: topOtuIds
        }
    };

    var data1=[trace1];
    
    var layout1 = {
        title: 'Marker Size',
        showlegend: false,
        xaxis: { title: "OTU ID" } 
      };
    
    Plotly.newPlot('bubble', data1, layout1);



    d3.select("#selected-dropdown").text("first");

    d3.select("select")
    .on("change",function(d){
    var selected = d3.select("#d3-dropdown").node().value;
    console.log( selected );
    d3.select("#selected-dropdown").text(selected);
})
    

});

