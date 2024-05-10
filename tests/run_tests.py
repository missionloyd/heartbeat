import requests
import json

HOST_PORT = 8080

# Base URL of your API
base_url = f"http://localhost:{HOST_PORT}/api/space"

# Define a common payload for testing
payload = {
    "assetName": "Engineering",
    "dateLevel": "HOUR",
    "startingDate": "1/1/22",
    "endingDate": "1/2/22",
}

# payload = {"parentAsset": "San Antonio"}

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
# routes = ["assets"]

# Test each route
results = [test_post_request(route, payload) for route in routes]

# Convert results to JSON
results_json = json.dumps(results, indent=4)

# Output the JSON
print(results_json)
