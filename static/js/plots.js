
// Variables to get cyclone data from JSON URLs
// Made global for ease of coding 
var cycloneAllData;
var timeCentrpres;
var centperWindspd;
var timeWindspd;


// Rounding function to round number to specified number of decimal places
// https://gist.github.com/djD-REK/2e347f5532bb22310daf450f03ec6ad8
const roundOne = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d)

// Function to plot line graph of cyclone over time
function displayLineGraph_cycType(cycloneData, cycloneName) {

    // Filter cycloneData to return only data for matching cyclone name
    // i.e. Only returns data for the desired cyclobe for line graphs
    let cyclone1CYCType = cycloneData.filter(cyclone => cyclone.NAME == cycloneName);

    // Display cyclone data to console for checking
    // Should be array of length 1
    console.log(cyclone1CYCType);

    let cycloneTimes = [];
    let cycloneTypes = [];

    //for loop to extract the time data for the CYC_TYPE
    for (let i=0; i < cyclone1CYCType.length; i++) {
        cycloneTime = cyclone1CYCType[i]['TM'];
        cycloneCYC = cyclone1CYCType[i]['CYC_TYPE'];
        cycloneTimes.push(cycloneTime);
        cycloneTypes.push(cycloneCYC);

    }
    console.log(cycloneTimes);
    console.log(cycloneTypes);

    // Plot with both lines and markers for each data point
    let lineData_actual = {
        x: cycloneTimes,
        y: cycloneTypes,
        name: "Cyclone CYC Types",
        type: "scatter",
        mode: "lines+markers",
        line: {
            color: 'crimson'
        }
    };
    //Cyclone CYC Types Vs Time
    // Place both data sets together in array
    let lineData = [lineData_actual];

    // Set title for line graph and x and y axes
    let lineLayout = {
         title: "CYC Types Vs Time",
         xaxis: { title: "Time" },
         yaxis: { title: "Cyclone Types" }
    };
    
    // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
    Plotly.newPlot('line1', lineData, lineLayout);
}


// // Function to plot line graph of country's birth rates over time
function displayLineGraph_centPress(cycloneData, cycloneName) {

    // Filter cycloneData to return only data for matching cyclone name
    // i.e. Only returns data for the desired cyclobe for line graphs
    let cyclone1CentPress = cycloneData.filter(cyclone => cyclone.NAME == cycloneName);

    // Display cyclone data to console for checking
    // Should be array of length 1
    // console.log(cyclone1CentPress);

    let cycloneTimes = [];
    let cycloneCentPress = [];

    //for loop to extract the time data for the CYC_TYPE
    for (let i=0; i < cyclone1CentPress.length; i++) {
        cycloneTime = cyclone1CentPress[i]['TM'];
        cycloneCP = cyclone1CentPress[i]['CENTRAL_PRES'];
        cycloneTimes.push(cycloneTime);
        cycloneCentPress.push(cycloneCP);

    }
    console.log(cycloneTimes);
    console.log(cycloneCentPress);

    // Plot with both lines and markers for each data point
    let lineData_actual = {
        x: cycloneTimes,
        y: cycloneCentPress,
        name: "Central Pressure Vs Time",
        type: "scatter",
        mode: "lines+markers"
    };
      
    // Place both data sets together in array
    let lineData = [lineData_actual];

    // Set title for line graph and x and y axes
    let lineLayout = {
         title: "Central Pressure Vs Time",
         xaxis: { title: "Time" },
         yaxis: { title: "Central Pressure (hPa)" }
    };
    
    // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
    Plotly.newPlot('line2', lineData, lineLayout);
}


// // Function to plot line graph of country's death rates over time
function displayLineGraph_windSpeed(cycloneData, cycloneName) {

    // Filter cycloneData to return only data for matching cyclone name
    // i.e. Only returns data for the desired cyclobe for line graphs
    let cyclone1windSpeed = cycloneData.filter(cyclone => cyclone.NAME == cycloneName);

    // Display cyclone data to console for checking
    // Should be array of length 1
    // console.log(cyclone1windSpeed);

    let cycloneTimes = [];
    let cycloneWindSpeed = [];

    //for loop to extract the time data for the CYC_TYPE
    for (let i=0; i < cyclone1windSpeed.length; i++) {
        cycloneTime = cyclone1windSpeed[i]['TM'];
        cycloneWS = cyclone1windSpeed[i]['MAX_WIND_SPD'];
        cycloneTimes.push(cycloneTime);
        cycloneWindSpeed.push(cycloneWS);

    }
    console.log(cycloneTimes);
    console.log(cycloneWindSpeed);

    // Plot with both lines and markers for each data point
    let lineData_actual = {
        x: cycloneTimes,
        y: cycloneWindSpeed,
        name: "Wind Speed Vs Time",
        type: "scatter",
        mode: "lines+markers",
        line: {
            color: 'rgb(255,20,147)'
        }
    };
      
    // Place both data sets together in array
    let lineData = [lineData_actual];

    // Set title for line graph and x and y axes
    let lineLayout = {
         title: "Max Wind Speed Vs Time",
         xaxis: { title: "Time" },
         yaxis: { title: "Max Wind Speed (m/s)" }
    };
    
    // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
    Plotly.newPlot('line3', lineData, lineLayout);
}

// // Function to plot line graph of country's death rates over time
function displayScatterPlot_CentPres_WindSpeed(cycloneData, cycloneName) {

    // Filter cycloneData to return only data for matching cyclone name
    // i.e. Only returns data for the desired cyclobe for line graphs
    let cyclone1CentWind = cycloneData.filter(cyclone => cyclone.NAME == cycloneName);

    // Display cyclone data to console for checking
    // Should be array of length 1
    // console.log(cyclone1windSpeed);

    let cycloneCentralPressure = [];
    let cycloneWindSpeed = [];

    //for loop to extract the time data for the CYC_TYPE
    for (let i=0; i < cyclone1CentWind.length; i++) {
        cycloneCP = cyclone1CentWind[i]['CENTRAL_PRES'];
        cycloneWS = cyclone1CentWind[i]['MAX_WIND_SPD'];
        cycloneCentralPressure.push(cycloneCP);
        cycloneWindSpeed.push(cycloneWS);

    }
    console.log(cycloneCentralPressure);
    console.log(cycloneWindSpeed);

    // Plot with both lines and markers for each data point
    let lineData_actual = {
        // x: cycloneCentralPressure,
        // y: cycloneWindSpeed,
        // name: "Central Pressure Vs Max Wind Speed",
        // type: "scatter",
        // mode: "markers",
        // line: {
        //     color: 'medium violet red',
        //     width: 3
        // }
        x: cycloneCentralPressure,
        y: cycloneWindSpeed,
        name: "Central Pressure Vs Max Wind Speed",
        mode: "markers",
        text: "Max Wind Speed",
        marker: {
            color: 'rgb(234, 153, 153)',
            size: 30,
            line: {
                color: 'white',
                width: 2
            }
        }
    };
      
    // Place both data sets together in array
    let lineData = [lineData_actual];

    // Set title for line graph and x and y axes
    // let lineLayout = {
    //      title: "Central Pressure Vs Max Wind Speed",
    //      xaxis: { title: "Central Pressure (hPa)" },
    //      yaxis: { title: "Max Wind Speed (m/s)" }
    // };
    let lineLayout = {
        title: "Central Pressure Vs Max Wind Speed",
        xaxis: { title: "Central Pressure (hPa)" },
        yaxis: { title: "Max Wind Speed (m/s)" }
    }


    
    // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
    Plotly.newPlot('line4', lineData, lineLayout);
}

// // Call function to update displays of plots
// // when the dropdown menu selection is changed
d3.selectAll("dropdown").on("change", optionChanged);

// Function to display plots from a country from dropdown menu selection
function optionChanged() {

    // Assign dropdown menu to variable using D3 and ID for menu given in HTML
    let dropdownMenu = d3.select("#dropdown");

    // Assign the value of the country dropdown menu option to a variable
    let cyclone = dropdownMenu.property("value");
    
    // Clear the already displayed country
    d3.select("#cyclone").html("");

    // Display the selected country in the countries page using header tag h3
    d3.select("#cyclone").insert("h3").text(cyclone);

    // Display the country selected from the dropdown menu to console
    console.log(dropdownMenu.property("value"));

    // Display the graphs for the desired country
    displayLineGraph_cycType(cycloneAllData, cyclone);
    displayLineGraph_centPress(cycloneAllData, cyclone);
    displayLineGraph_windSpeed(cycloneAllData, cyclone);
    displayScatterPlot_CentPres_WindSpeed(cycloneAllData, cyclone);

}

// Initialisation function
function init() {

    // Name and path to JSON file with dataset 
    let cyclonesURL = "/api/cyclones";

    // Read in JSON from URL
    d3.json(cyclonesURL).then(function(data) {
    
        // Assign the cyclone data to cycloneAllData
        cycloneAllData = data;

        // Display first country's to console for checking
        // Countries are in ranked order of population
        console.log(cycloneAllData[0]);

        // Display line graph of actual and predicted population for Australia
        displayLineGraph_cycType(cycloneAllData, "Abele");
        displayLineGraph_centPress(cycloneAllData, "Abele");
        displayLineGraph_windSpeed(cycloneAllData, "Abele");
        displayScatterPlot_CentPres_WindSpeed(cycloneAllData, "Abele");
    });

}

// Call initialisation function
init();