window.onload = function () {
    var markers = getRequestMarkers();
    console.log(markers);

    var mymap = L.map('map', {
        center: [-35.505, -63.09],
        zoom: 4,
        minZoom: 2,
        maxZoom: 8,
        maxBounds: [
            [-89.9999, -179.9999],
            [89.9999, 179.9999]
        ]});

    for ( var i = 0; i < markers.length; i++ ) {
        var m = markers[i];
        // var m = L.marker([p.lat,p.lon]);
        m.bindPopup("Position: " + m.toString()).addTo(mymap);
    }
    // OpenStreetMap
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    // MapBoxMap
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.dark',
    //     accessToken: 'paste_token'
    // }).addTo(mymap);

    var popup = L.popup();

    function onMapClick(e) {
        L.marker(e.latlng, {draggable: true}).bindPopup("Position: " + e.latlng.toString()).addTo(mymap);
        markers.push(e.latlng);
        console.log(markers);
    }
    mymap.on('click', onMapClick);

    document.getElementById("get_curtain").addEventListener("click", get_curtain_url);
    document.getElementById("get_route_url").addEventListener("click", get_route_url);

    // Generate a route link using the set markers
    function get_curtain_url() {
        baseurl = 'http://localhost:5000/route?';
        generated_url = baseurl;
        for ( var i = 0; i < markers.length; i++ ) {
            m = markers[i];
            generated_url += "lat=" + m["lat"];
            generated_url += "&"
            generated_url += "lon=" + m["lng"];
            generated_url += "&"
        }
        window.open(generated_url.substring(0,generated_url.length - 1));
    }

    // Generate a route link using the set markers
    function get_route_url() {
        baseurl = 'http://localhost:5000/hello/world?';
        generated_url = baseurl;
        for ( var i = 0; i < markers.length; i++ ) {
            m = markers[i];
            generated_url += "lat=" + m["lat"];
            generated_url += "&"
            generated_url += "lon=" + m["lng"];
            generated_url += "&"
        }
        // window.open(generated_url.substring(0,generated_url.length - 1));
        alert(generated_url.substring(0,generated_url.length - 1));
    }

};

function getRequestMarkers() {
    // Returns all request params
    var s1 = location.search.substring(1, location.search.length).split('&'),
        r = [], s2, i;
    for (i = 0; i < s1.length; i += 1) {
        var obj = {};
        if (s1[i].split('=')[0] == 'lat'  &&  s1[i+1].split('=')[0] == 'lon')  {
            for (j = 0; j < 2; j+=1) {
                s2 = s1[i+j].split('=');
                obj[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
            }
        var g = L.latLng(obj.lat,obj.lon)
        var m = L.marker(g, {draggable: true})
        r.push(m);
        } else if (s1[i].substring(0,3) != 'lon'){
            console.log("Skipping", s1[i]);
        }
    }
    return r;
};
