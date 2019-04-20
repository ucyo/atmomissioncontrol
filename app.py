from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/hello/<name>')
def hello_world(name=None):
    return render_template('index.html', name=name)


@app.route('/route')
def get_route():
    """
    Get lat,lon coordinates from request URL

    Example
    =======
    http://localhost:5000/route?lat=232.2411&lon=32.1241&lat=231.231&lon=2423.2341
    """
    lats = request.args.getlist('lat', type=float)
    lons = request.args.getlist('lon', type=float)
    markers = {i:{'lat': lat, 'lon': lng} for (i,(lat,lng)) in enumerate(zip(lats,lons))}
    return str(markers)
