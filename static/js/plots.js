
// Variables to get population data, birth rates, death rates, sex ratios from JSON URLs
// Made global for ease of coding after previous development
var cycloneAllData;
var timeCentrpres;
var centperWindspd;
var timeWindspd;


// Rounding function to round number to specified number of decimal places
// https://gist.github.com/djD-REK/2e347f5532bb22310daf450f03ec6ad8
const roundOne = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d)

// Function to plot line graph of country's population over time
function displayLineGraph_cycType(cycloneData, cycloneName) {

    // Filter populationData to return only data for matching country name
    // i.e. Only returns data for the desired country for line graphs
    let cyclone1CYCType = cycloneData.filter(cyclone => cyclone.NAME == cycloneName);

    // Display population data to console for checking
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
        name: "Cyclone CYC Types Vs Time",
        type: "scatter",
        mode: "lines+markers"
    };
      
    // Place both data sets together in array
    let lineData = [lineData_actual];

    // Set title for line graph and x and y axes
    let lineLayout = {
         title: "Cyclone CYC Types Vs Time",
         xaxis: { title: "Time" },
         yaxis: { title: "Cyclone Types" }
    };
    
    // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
    Plotly.newPlot('line1', lineData, lineLayout);
}


// // Function to plot line graph of country's birth rates over time
// function displayLineGraph_centPres(cenpresData, timeData) {

//     // Filter birthRatesData to return only data for matching country name
//     // i.e. Only returns data for the desired country for line graphs
//     let timeCentrpres = cenpresData.filter(name => name.NAME == cycType);

//     // Display birth rate data to console for checking
//     // Should be array of length 1
//     // If array is of length 0, no data recorded for this country
//     // Set lists to be empty
//     // Results in empty plot
//     if (timeCentrpres.length == 0) {
//         timeCent = [];
//         centPressure = [];
//     }
//     else {
//         // console.log(countryBirthRate);
//         // Extract years (keys) and birth rates (values) from data 
//         timeCent = Object.keys(timeCentrpres[0]);
//         centPressure = Object.values(timeCentrpres[0]);
//         // Converting 0 values to null
//         if(centPressure.indexOf(0) !== -1) {
//             for (let j=0; j < centPressure.length; j++) {
//                 centPressure.splice(centPressure.indexOf(0), 1, null);
//             }
//         }
//         // console.log(birthRatesAmounts);

//     }
    
//     // Select the first 10 elements of data for the birth rates
//     // Convert year string to number
//     // Plot with both lines and markers for each data point
//     let lineData_centpress = {
//         x: timeCent.slice(0,10).map(i => Number(i)),
//         y: centPressure.slice(0,10),
//         line: { color: "green"},
//         markers: { color: "green" },
//         name: "Cent Pressure",
//         type: "scatter",
//         mode: "lines+markers"
//     };
      
//     // Place data set in array
//     let lineData = [lineData_centpress];

//     // Set title for line graph and x and y axes
//     let lineLayout = {
//          title: cycType + " - Central pressure of the cyclone",
//          xaxis: { title: "Years" },
//          yaxis: { title: "Central Pressure" }
//     };
    
//     // Use plotly to display line graph at div ID "line2" with lineData and lineLayout
//     Plotly.newPlot('line2', lineData, lineLayout);
// }

// // Function to plot line graph of country's death rates over time
// function displayLineGraph_CentWind(windSpeed, cycType) {

//     // Filter deathRatesData to return only data for matching country name
//     // i.e. Only returns data for the desired country for line graphs
//     let centperWindspd = windSpeed.filter(name => name.NAME == cycType);

//     // Display death rate data to console for checking
//     // Should be array of length 1
//     // If array is of length 0, no data recorded for this country
//     // Set lists to be empty
//     // Results in empty plot
//     if (centperWindspd.length == 0) {
//         timeWind = [];
//         centPreWind = [];
//     }
//     else {
//         // console.log(countryDeathRate);
//         // Extract years (keys) and death rates (values) from data 
//         timeWind = Object.keys(centperWindspd[0]);
//         centPreWind = Object.values(centperWindspd[0]);
//         // Converting 0 values to null
//         if(centPreWind.indexOf(0) !== -1) {
//             for (let j=0; j < centPreWind.length; j++) {
//                 centPreWind.splice(centPreWind.indexOf(0), 1, null);
//             }
//         }
//     }

//     // Select the first 10 elements of data for the death rates
//     // Convert year string to number
//     // Plot with both lines and markers for each data point
//     let lineData_windSpeed = {
//         x: timeWind.slice(0,10).map(i => Number(i)),
//         y: centPreWind.slice(0,10),
//         line: { color: "gray"},
//         markers: { color: "gray" },
//         name: "Wind Speed",
//         type: "scatter",
//         mode: "lines+markers"
//     };
      
//     // Place data set in array
//     let lineData = [lineData_windSpeed];

//     // Set title for line graph and x and y axes
//     let lineLayout = {
//          title: cycType + " Wind Speed",
//          xaxis: { title: "Years" },
//          yaxis: { title: "Wind Speed (10 min average winds)" }
//     };
    
//     // Use plotly to display line graph at div ID "line3" with lineData and lineLayout
//     Plotly.newPlot('line3', lineData, lineLayout);
// }

// // Function to plot line graph of country's death rates over time
// function displayLineGraph_TimeWind(windTime, cycType) {

//     // Filter sexRatiosData to return only data for matching country name
//     // i.e. Only returns data for the desired country for line graphs
//     let timeWindspd = windTime.filter(name => name.NAME == cycType);

//     // Display sex ratio data to console for checking
//     // Should be array of length 1
//     // If array is of length 0, no data recorded for this country
//     // Set lists to be empty
//     // Results in empty plot
//     if (timeWindspd.length == 0) {
//         windspdTime = [];
//         speedTime = [];
//     }
//     else {
//         // console.log(countrySexRatio);
//         // Extract years (keys) and sex ratios (values) from data 
//         windspdTime = Object.keys(timeWindspd[0]);
//         speedTime = Object.values(timeWindspd[0]);
//         // Converting 0 values to null
//         if(speedTime.indexOf(0) !== -1) {
//             for (let j=0; j < speedTime.length; j++) {
//                 speedTime.splice(speedTime.indexOf(0), 1, null);
//             }
//         }
//     }
    
//     // Select the first 10 elements of data for the sex ratios
//     // Convert year string to number
//     // Plot with both lines and markers for each data point
//     let lineData_timeWind = {
//         x: windspdTime.slice(0,10).map(i => Number(i)),
//         y: speedTime.slice(0,10),
//         line: { color: "pink"},
//         markers: { color: "pink" },
//         name: "Wind Speed",
//         type: "scatter",
//         mode: "lines+markers"
//     };
      
//     // Place data set in array
//     let lineData = [lineData_timeWind];

//     // Set title for line graph and x and y axes
//     let lineLayout = {
//          title: cycType + " Wind Speed over cyclone period",
//          xaxis: { title: "Years" },
//          yaxis: { title: "Wind Speed" }
//     };
    
//     // Use plotly to display line graph at div ID "line4" with lineData and lineLayout
//     Plotly.newPlot('line4', lineData, lineLayout);
// }

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
    // displayLineGraph_centPres(timeCentrpre, country);
    // displayLineGraph_CentWind(centperWindspd, country);
    // displayLineGraph_TimeWind(timeWindspd, country)

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
        displayLineGraph_cycType(cycloneAllData, "ELMA");

    });

    // Name and path to JSON file with dataset for countries birth rates
    // let birthrateURL = "/api/population/birth";

    // // Read in JSON from URL
    // d3.json(cyclonesURL).then(function(data) {
    
    //     // Assign the birth rate data for all countries to variable countryBirthRates
    //     timeCentrpres = data;

    //     // Display first country's birth rates to console for checking
    //     // Countries are in ranked order of population
    //     // console.log(data[0]);

    //     // Display line graph of birth rates for Australia
    //     displayLineGraph_centPre(timeCentrpres, "Abele");

    // });

    // // Name and path to JSON file with dataset for countries death rates
    // // let deathrateURL = "/api/population/death";

    // // Read in JSON from URL
    // d3.json(cyclonesURL).then(function(data) {
        
    //     // Assign the death rate data for all countries to variable countryDeathRates
    //     centperWindspd = data;
    
    //     // Display first country's death rates to console for checking
    //     // Countries are in ranked order of population
    //     // console.log(countryDeathRates[0]);
    
    //     // Display line graph of death rates for Australia
    //     displayLineGraph_CentWind(centperWindspd, "Abele");
    
    // });
    
    // // Name and path to JSON file with dataset for countries sex ratios
    // // let sexratioURL = "/api/population/sex-ratio";

    // // Read in JSON from URL
    // d3.json(cyclonesURL).then(function(data) {
        
    //     // Assign the sex ratio data for all countries to variable countrySexRatios
    //     timeWindspd = data;
    
    //     // Display first country's sex ratios to console for checking
    //     // Countries are in ranked order of population
    //     // console.log(countrySexRatios[0]);
    
    //     // Display line graph of sex ratios for Australia
    //     displayLineGraph_TimeWind(timeWindspd, "Abele");
    
    // });

}

// Call initialisation function
init();