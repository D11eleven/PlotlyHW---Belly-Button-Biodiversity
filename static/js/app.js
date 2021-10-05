function getPlot(name) {

    //  json 
    d3.json("./data/samples.json").then((data) => {




    const otu_ids = data.otu_ids
    const otu_labels = data.otu_labels
    const sample_values = data.sample_values 



    //tutor         

    // var samples = data.samples.filter( x=> x.id === name)[0];
    // var sample_values = samples.sample_values.slice(0,10).reverse();
    
    // var topTenValues = samples.otu_ids.slice(0,10).reverse();
    // var otu_id = topTenValues.map(x => "OTU " + x)
    
    // var labels = samples.otu_labels.slice(0,10);



//  Act 3-4

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

   

//  Act 2-9 

    // bar chart
    var traceBar = [{
        x: sample_values,
        y: otu_id,
        hovertext: labels,
        marker: {
            color: '#d40611'},
            type: "bar",
            orientation: "h"
        }
        
    ];

    var layoutBar = {
        title: "Top 10 OTUs Bar Chart",
        margin: {
            l: 100,
            r: 100,
            t: 50,
            b: 50
        }
    };

    

    Plotly.newPlot("bar",traceBar,layoutBar);

    // bubble chart

    var traceBubble = [{
        x: samples.otu_ids,
        y: samples.sample_values,
        hovertext: samples.otu_labels
    }
];

    var layoutBubble = {
        title:"Top 10 OTUs Bubble Chart",
        xaxis:{title: "OTU ID"},
        yaxis:{title: "Sample Values"},
        height: 600,
        width: 1000
    };

    
    Plotly.newPlot("bubble",traceBubble,layoutBubble);



    // pie chart

    var tracePie = [{
    values: sample_values,
    labels: otu_id,
    // display: [otu_labels],
    // showInLegend: true, ??? 
    type: 'pie'
  }
];
  
  var layoutPie = {
    
    height: 600,
    width: 600,
    
  };
  
  Plotly.newPlot('pie', tracePie, layoutPie)


});

    
}


//  Act 3-5  tutor  
// Panel 
function getInfo(name) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(x => x.id.toString() === name)[0];

        //  from index html 

        var info = d3.select('#sample-metadata');

        info.html("");
        Object.entries(result).forEach((x) => {
            info.append("h6").text(x[0].toUpperCase() + ": " + x[1] + "\n");
        });
    });   
}

// index optionChanged event 

function optionChanged(name) {
    getPlot(name);
    getInfo(name);
}


init()
