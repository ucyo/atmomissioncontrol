// window.onload = function () {
//     var mymap = L.map('map').setView([51.505, -0.09], 13);

//     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox.streets',
//         accessToken: 'pk.eyJ1IjoidWN5byIsImEiOiJjaXNscG1oYTAwMDc5Mm5uNTBudDhoNm5uIn0.ofb4dzyt3bY9h6Bqul_Amg'
//     }).addTo(mymap);

// };

window.onload = function () {
    var mymap = L.map('map').setView([-25.505, -63.09], 3);
    var markers = [];

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.dark',
    //     accessToken: 'paste_token'
    // }).addTo(mymap);

    var popup = L.popup();

    function onMapClick(e) {
        L.marker(e.latlng).bindPopup("Position: " + e.latlng.toString()).addTo(mymap);
        markers.push(e.latlng);
        console.log(markers);
    }
    mymap.on('click', onMapClick);

    document.getElementById("save_route").addEventListener("click", func);
    function func() {
        alert(markers)
    }

};
