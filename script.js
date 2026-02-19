/**
 * TASK 1: Accept a variable number of arguments and multiply them.
 */
function multiplyArgs(...args) {
    if (args.length === 0) return 0;
    return args.reduce((acc, curr) => acc * curr, 1);
}

/**
 * TASK 2: Get the user data from the API and map to the variables
 * we are interested in.
 */
async function loadData() { 
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await response.json();
    
    const cleaned = usersData.map(user => ({
        id: user.id, 
        username: user.username,
        latitude: parseFloat(user.address.geo.lat),
        longitude: parseFloat(user.address.geo.lng)
    }));
    
    return cleaned;
}

async function run() {
    console.log(multiplyArgs(54, 97));
    console.log(multiplyArgs(2, 4, 10));
    console.log(multiplyArgs(12, 43, 565, 7586));

    const data = await loadData();
     

    const barchartValues = data.map((d) => ({
        index: d.username,
        value: d.latitude,
    }));
    
    tfvis.render.barchart(
        {name: 'Bar Chart: User Latitudes'},
        barchartValues, 
        { height: 300, width: 600, xLabel: "Username", yLabel: "Latitude" }
    );

    const linechartValues = data.map((d) => ({
        x: d.id,
        y: d.longitude,
    }));

    tfvis.render.linechart(
        {name: 'Line Chart: User Longitudes'},
        {values: [linechartValues], series: ['Longitude']},
        { height: 300, width: 600, xLabel: "User ID", yLabel: "Longitude" }
    );

    const scatterValues = data.map((d) => ({
        x: d.latitude,
        y: d.longitude,
    }));

    tfvis.render.scatterplot(
        {name: 'Scatter Plot: Lat vs Lng'},
        {values: [scatterValues], series: ['Location']},
        { height: 300, width: 600, xLabel: "Latitude", yLabel: "Longitude" }
    );
    
    tfvis.visor().open();
}

document.addEventListener('DOMContentLoaded', run);