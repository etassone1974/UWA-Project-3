let url = "/api/cyclones";

d3.json(url).then(function(response){
    window.cyclone_name = [];
    let data = response;
    for (let i=0; i<data.length; i++) {
        let cyclone = data[i]["NAME"];
        // console.log("Name:", cyclone);
        // console.log(cyclone == "noname");
        // if (cyclone == "noname")
        // { 
        //     console.log("Skipping", cyclone);
        // }
        // else if (cyclone == "Unnamed") 
        // {
        //     console.log("Skipping", cyclone);
        // }
        // else 
        // {
            console.log("Accepted name:", cyclone);
            cyclone_name.push(cyclone);
            //}
        }
                
           

    cyclone_name.sort();
    console.log(cyclone_name);
    // jSuites.dropdown(document.getElementById('dropddown'), {
    //     data:cyclone_name,
    //     placeholder:"Name",
    //     autocomplete: true,
    //     lazyloading: true,
    //     multiple: false,
    //     width: '200px',
//});
});