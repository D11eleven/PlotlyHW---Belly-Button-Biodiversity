function getPlot(name) {

    // getting data from json file
    d3.json("./data/samples.json").then((data) => {

    var samples = data.samples.filter(x => x.id === name)[0];
    var sample_values = samples.sample_values.slice(0,10).reverse();
    
    var topTenValues = samples.otu_ids.slice(0,10).reverse();
    var otu_id = topTenValues.map(x => "OTU " + x)
    
    var labels = samples.otu_labels.slice(0,10);
    



 



// bar chart
var traceBar = [{
    x: sample_values,
    y: otu_id,
    hovertext: labels,
    marker: {
        color: '#3Ce'},
        type: "bar",
        orientation: "h"
    }
    
];

var layoutBar = {
    title: "Top 10 OTUs Bar Chart",
    yaxis: {
        tickmode:"linear",
    },
    
};



Plotly.newPlot("bar",traceBar,layoutBar);

// bubble chart

var traceBubble = [{
    x: samples.otu_ids,
    y: samples.sample_values,
    mode: "markers",
    marker: {
        size: samples.sample_values,
        
    },
    // markersize: samples.sample_values,
    text: samples.otu_labels
}
];

var layoutBubble = {
    title:"Top 10 OTUs Bubble Chart",
    xaxis:{title: "OTU_ID"},
    yaxis:{title: "Sample_Values"},
    height: 600,
    width: 1200
};



Plotly.newPlot("bubble",traceBubble,layoutBubble);



// pie chart


var tracePie = [{
values: sample_values,
labels: data.otu_ids,
display: data.otu_labels,
type: 'pie'
}
];

var layoutPie = {
title:"Top 10 OTUs Pie Chart",   
values: sample_values,
labels: data.otu_id,
display: data.otu_labels,
height: 600,
width: 600
};

Plotly.newPlot('pie', tracePie, layoutPie);

    });

}


//index id sample-metadata panel 

function getInfo(name) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(x => x.id.toString() === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        Object.entries(result).forEach((x) => {
            info.append("h6").text(x[0].toUpperCase() + ": " + x[1] + "\n");
        });
    });   

}
function init() {
        var dropDown = d3.select('#selDataset');
        d3.json("data/samples.json").then((data) => {
            console.log(data)
            data.names.forEach(x => {
                dropDown.append("option").text(x).property("value");
            });
            getPlot(data.names[0]);
            getInfo(data.names[0]);
        });
    }
    

//index onchange 

function optionChanged(name) {
    getPlot(name);
    getInfo(name);
}
    

init()

// test