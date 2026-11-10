API Monitoring Dashboard Setup Using Grafana

## Aim

To monitor API performance using Prometheus and Grafana by collecting
API metrics and displaying them through a live monitoring dashboard.

## Tools Required

-   Python
-   Flask
-   Prometheus
-   Grafana
-   Docker

This practical uses the Flask API from the previous exercises.

## Step 1: Install Required Python Packages

Open a terminal and run:

``` bash
pip install flask prometheus-flask-exporter
```

## Step 2: Create a Flask API with a Metrics Endpoint

Create a file named `app.py`:

``` python
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
```

The `PrometheusMetrics` library automatically collects API metrics such
as:

-   Total number of requests
-   Request duration
-   HTTP response status codes

It also exposes a `/metrics` endpoint for Prometheus.

## Step 3: Run the Flask Application

Run:

``` bash
python app.py
```

Open the API:

``` text
http://localhost:5000
```

Open the metrics endpoint:

``` text
http://localhost:5000/metrics
```

You should see metrics in Prometheus exposition format. Example metric
names may include:

``` text
flask_http_request_total
flask_http_request_duration_seconds_count
```

The actual values depend on the requests made to the API.

## Step 4: Configure Prometheus

Create a file named `prometheus.yml` in the project folder:

``` yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'flask-api'
    static_configs:
      - targets: ['host.docker.internal:5000']
```

This configuration tells Prometheus to collect metrics from the Flask
API every five seconds.

> **Note:** `host.docker.internal` is suitable for Docker Desktop on
> Windows and macOS. On Linux, configure a host-gateway mapping or use
> an appropriate reachable host address.

## Step 5: Run Prometheus Using Docker

Open a terminal in the folder containing `prometheus.yml` and run:

``` bash
docker run -d --name prometheus -p 9090:9090 -v "${PWD}/prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
```

On Windows PowerShell, `${PWD}` works in this command. If the
configuration file is not mounted correctly, use an absolute path to
`prometheus.yml`.

Open Prometheus:

``` text
http://localhost:9090
```

Go to **Status → Targets**. The `flask-api` target should show as
**UP**.

## Step 6: Run Grafana Using Docker

Open another terminal and run:

``` bash
docker run -d --name grafana -p 3000:3000 grafana/grafana
```

Open Grafana:

``` text
http://localhost:3000
```

Default login credentials:

-   Username: `admin`
-   Password: `admin`

Grafana may ask you to change the password after the first login.

## Step 7: Connect Prometheus to Grafana

1.  In Grafana, go to **Connections → Data sources**.

2.  Click **Add data source**.

3.  Select **Prometheus**.

4.  Enter this URL:

    ``` text
    http://host.docker.internal:9090
    ```

5.  Click **Save & Test**.

The connection should be successful.

> **Note:** This URL is for Grafana running in Docker Desktop on Windows
> or macOS. If Grafana and Prometheus use the same Docker network, use
> the Prometheus container/service name and port, for example
> `http://prometheus:9090`. On Linux, configure a shared Docker network
> or another reachable address.

## Step 8: Create a Grafana Dashboard

1.  Go to **Dashboards**.
2.  Select **New → New Dashboard**.
3.  Click **Add visualization**.
4.  Select the Prometheus data source.
5.  Enter one of the following PromQL queries.

### Visualization 1: Total API Requests

``` promql
sum(flask_http_request_total)
```

This displays the total number of API requests recorded by the exporter.

### Visualization 2: Average API Response Time

``` promql
rate(flask_http_request_duration_seconds_sum[1m])
/
rate(flask_http_request_duration_seconds_count[1m])
```

This calculates the average request duration in seconds over the last
minute. It may show no data until requests have been recorded in the
selected time window.

### Visualization 3: Server Error Rate

``` promql
100 *
sum(rate(flask_http_request_total{status=~"5.."}[1m]))
/
clamp_min(sum(rate(flask_http_request_total[1m])), 1)
```

This calculates the percentage of HTTP 5xx responses among all recorded
requests over the last minute.

Suggested visualization types:

-   Total requests: **Stat**
-   Response time: **Time series**
-   Error rate: **Time series**

Click **Apply** and save the dashboard as `API Monitoring Dashboard`.

## Step 9: Generate API Requests and Observe Metrics

Open another terminal and run:

``` bash
curl http://localhost:5000/
curl http://localhost:5000/students
curl http://localhost:5000/students
```

Run the commands several times. Return to Grafana and check the panels.
Set the dashboard refresh interval if needed.

The visualizations should update as Prometheus scrapes new metrics. The
error-rate panel may show zero or no data if no server errors have
occurred.

## Step 10: Capture Screenshots

Take screenshots of the following for the practical record:

1.  Flask API running.
2.  `http://localhost:5000/metrics` displaying metrics.
3.  Prometheus **Status → Targets** showing `flask-api` as **UP**.
4.  Grafana Prometheus data source showing a successful connection.
5.  Grafana dashboard showing the API metric visualizations.

## Deliverables

  Deliverable          What to submit
  -------------------- -------------------------------------------
  Metrics endpoint     Flask code exposing `/metrics`
  Configuration        `prometheus.yml`
  Running API          Screenshot of Flask application
  Prometheus           Screenshot showing target status **UP**
  Grafana dashboard    Screenshot showing metric visualizations
  Metric observation   Short note explaining one observed metric

## Short Note on an Observed Metric: API Response Time

API response time is the time taken by an API to process a request and
return a response.

For example, if the dashboard shows an average response time of `0.15`
seconds, the API takes approximately 150 milliseconds per request on
average during the selected time interval.

A lower response time generally indicates better responsiveness. A
higher response time may indicate performance issues.

## Theory Questions

### 1. What is API monitoring, and why is it important in a production environment?

API monitoring is the process of continuously checking an API's
performance, availability, and health.

**Importance:**

-   Detects API failures and errors.
-   Monitors response time.
-   Checks API availability.
-   Identifies performance issues.
-   Helps maintain application reliability.
-   Allows developers to identify problems quickly.

In simple words, API monitoring helps developers continuously check
whether APIs are working correctly and responding quickly.

### 2. What do response time and error rate indicate about API performance?

**Response time:** The time taken by an API to process a request and
return a response.

-   Low response time generally indicates faster API performance.
-   High response time may indicate slower performance.

**Error rate:** The percentage of API requests that result in errors.

-   Low error rate indicates that most API requests are successful.
-   High error rate indicates frequent API failures.

For example, if 100 requests are made and 5 result in server errors, the
server error rate is 5%.

## Quick Summary of Tools

  Tool         Purpose
  ------------ -------------------------------------------
  Flask        Creates the API
  Prometheus   Collects and stores API metrics
  Grafana      Displays metrics in dashboards
  Docker       Runs Prometheus and Grafana in containers

**Remember:** Prometheus collects and stores the metrics, whereas
Grafana displays those metrics in a visual dashboard.
