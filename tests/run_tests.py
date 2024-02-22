import requests
import json

HOST_PORT = 8000

# Base URL of your API
base_url = f"http://localhost:{HOST_PORT}/api/space"

# Define a common payload for testing
payload = {
    "commodity": "electricity",
    "bldgname": "Engineering",
    "timeSteps": [0, 23],
    "datelevel": "hour",
    "table": "spaces",
    "context": "",
    "startDate": "1/1/23",
    "endDate": "1/2/23",
}

# Headers to indicate that the body is JSON
headers = {"Content-Type": "application/json"}


# Function to send POST request and collect response
def test_post_request(route, payload):
    response = requests.post(
        f"{base_url}/{route}",
        data=json.dumps(payload),
        headers=headers,
    )
    return {
        "route": route,
        "status_code": response.status_code,
        "response": response.text,
    }


# List of routes to test
routes = ["points", "summary"]

# Test each route
results = [test_post_request(route, payload) for route in routes]

# Convert results to JSON
results_json = json.dumps(results, indent=4)

# Output the JSON
print(results_json)
