let url = "/api/cyclones";

d3.json(url).then(function(response){
    window.cyclone_name = [];
    let data = response[0]['data'];
    for (let i=0; i<data.length; i++) {
        console.log(data[i]["Cyclone Name"]);
        if (data[i]['Cyclone Name'] != "noname") {
            cyclone_name.push(data[i]["Cyclone Name"]);
        }
    }
    cyclone_name.sort();
    jSuites.dropdown(document.getElementById('dropddown'), {
        data:cyclone_name,
        placeholder:"Name",
        autocomplete: true,
        lazyloading: true,
        multiple: false,
        width: '200px',
});
});