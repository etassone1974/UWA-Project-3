// URL for cyclones API returned as JSON file
let url = "/api/cyclones";

// Function to convert to title case, splitting on hyphen for hyphenated names
// https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
var toTitleCase = function (str) {
	str = str.toLowerCase().split('-');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join('-');
};


d3.json(url).then(function(response){
    window.cyclone_name = [];
    let cyclone_data = response;
    for (let i=0; i < cyclone_data.length; i++) {
        let new_cyclone = cyclone_data[i]["NAME"];
        if ((new_cyclone != "Noname") || (new_cyclone != "Unnamed"))
        {
            if (cyclone_name.includes(new_cyclone) == false)
            {
                cyclone_name.push(new_cyclone);
            }
        }
        // else if (new_cyclone == "Noname")
        // {
        //     console.log("Skipping", new_cyclone);
        // }
        // else if (new_cyclone == "Unnamed") 
        // {
        //     console.log("Skipping", new_cyclone);
        // }
        // else if (new_cyclone == "unnamed")
        // {
        //     console.log("Skipping", new_cyclone);
        // }
        // else if (new_cyclone == "UNNAMED")
        // {
        //     console.log("Skipping", new_cyclone);
        // }
        // else 
        // {
        //     let cyclone_uppercase = toTitleCase(new_cyclone);
        //     // console.log("Accepted name:", cyclone_uppercase);
        //     if (cyclone_name.includes(cyclone_uppercase) == false)
        //     {
        //         cyclone_name.push(cyclone_uppercase);
        //     }
    }

    cyclone_name.sort();
    console.log(cyclone_name);
    jSuites.dropdown(document.getElementById('dropdown'), {
        data:cyclone_name,
        placeholder:"Name",
        autocomplete: true,
        lazyloading: true,
        multiple: false,
        width: '200px',
});
});