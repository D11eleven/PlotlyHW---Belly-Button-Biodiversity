
     // get data from json file ;  top10 val after .reverse()
function getPlot(name) {

   
    d3.json("./data/samples.json").then((data) => {

    var samples = data.samples.filter(x => x.id === name)[0];
    var sample_values = samples.sample_values.slice(0,10).reverse();
    
    var topTenValues = samples.otu_ids.slice(0,10).reverse();

    //for chart
    var otu_id = topTenValues.map(x => "OTU " + x)
    
    var labels = samples.otu_labels.slice(0,10);


    //   


// horizontal bar chart
var traceBar = [{
    x: sample_values,
    y: otu_id,
    text: labels,
    type: "bar",
    orientation: "h"
    }
    
];

var layoutBar = {
    title: "Top 10 OTUs Bar Chart"
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
    // marker: size: samples.sample_values,
    text: labels
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
labels: topTenValues,
display: samples.otu_labels,
type: 'pie'
}
];

var layoutPie = {
title:"Top 10 OTUs Pie Chart",   
values: samples.values,
labels: samples.otu_id,
display: samples.otu_labels,
height: 600,
width: 600
};

Plotly.newPlot('pie', tracePie, layoutPie);

    });


} 

    
    // Dem Info  index id sample-metadata panel   filter for id selected clear htm 
    function getId(name) {
        d3.json("./data/samples.json").then((data) => {
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

    d3.json("./data/samples.json").then((data) => {
    console.log(data)
    data.names.forEach(x => {
    dropDown.append("option").text(x).property("value");
    });
    getPlot(data.names[0]);
    getId(data.names[0]);
}); 

}


//index  initiated onchange   ln28
function optionChanged(name) {
    getPlot(name);
    getId(name);
    }

// populate page on start 
 init();



