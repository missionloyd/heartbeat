import requests
import json

HOST_PORT = 8080

# Base URL of your API
base_url = f"http://localhost:{HOST_PORT}/api/space"

# Define a common payload for testing
payload = {
    # "assetName": "%",
    "assetName": "Student Union",
    "commodityName": "electricity",
    "dateLevel": "Day",
    "startDate": "2019-09-19",
    "endDate": "2023-02-05",
    # "isHistoricalIncluded": "tRuE",  # comment out to get default behavior (default = false)
}

# Headers to indicate that the body is JSON
headers = {"Content-Type": "application/json"}


# Function to send POST request and collect response
def test_post_request(route, payload, fields="*"):
    response = requests.post(
        f"{base_url}/{route}",
        data=json.dumps(payload),
        headers=headers,
    )
    # Parse the JSON response
    data = response.json()["data"]

    # Function to extract fields based on the list or wildcard
    def extract_fields(item, fields):
        if fields == "*":
            return item  # Return the whole item if wildcard is used
        else:
            return {
                field: item.get(field) for field in fields
            }  # Extract specified fields

    # Initialize an empty list to store specific data from each item
    specific_data = []

    # Check if 'data' is a list of items
    if isinstance(data, list):
        # Process each item in the list
        for item in data:
            specific_data.append(extract_fields(item, fields))
    else:
        # Handle the case where 'data' is a single JSON object
        specific_data.append(extract_fields(data, fields))

    return {
        "route": route,
        "status_code": response.status_code,
        "specific_data": specific_data,
    }


# List of routes to test
# routes = ["points"]
routes = ["summary"]

# Fields to extract (can be a list of field names or '*' for all fields)
# fields_to_extract = ["name", "average", "latest"]  # Example specific fields
fields_to_extract = "*"  # Uncomment this to return all fields

# Test each route with specified fields
results = [test_post_request(route, payload, fields_to_extract) for route in routes]

# Convert results to JSON
results_json = json.dumps(results, indent=4)

# Output the JSON
print(results_json)
