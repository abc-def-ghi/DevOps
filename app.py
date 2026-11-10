from flask import Flask
from prometheus_flask_exporter import PrometheusMetrics

app = Flask(__name__)

# Enable Prometheus metrics
metrics = PrometheusMetrics(app)

@app.route('/')
def home():
    return "Welcome to Student API"

@app.route('/students')
def students():
    return {
        "students": [
            {"id": 1, "name": "Rahul"},
            {"id": 2, "name": "Priya"}
        ]
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
