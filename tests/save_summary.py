import requests
import json

HOST_PORT = 8080

# Base URL of your API
base_url = f"http://localhost:{HOST_PORT}/api/space"

# Headers to indicate that the body is JSON
headers = {"Content-Type": "application/json"}


def test_summary(asset_name):
    payload = {
        "assetName": asset_name,
        "commodityName": "%",
        "dateLevel": "MONTH",
        "startDate": "2019-10-01",
        "endDate": "2023-01-31",
        "isHistoricalIncluded": "false",
        "isMeasurementPrediction": "false",
    }

    route = "summary"
    response = requests.post(
        f"{base_url}/{route}",
        data=json.dumps(payload),
        headers=headers,
    )

    # Parse the JSON response
    data = response.json()["data"]

    file_name = "tests/summary_results.json"

    if asset_name == "Animal Science":
        with open(file_name, "w") as file:
            json.dump(data, file, indent=4)
    else:
        with open(file_name, "a") as file:
            json.dump(data, file, indent=4)

    print(f"Saved 'Summary' API results for {asset_name} in {file_name}")


campus_heartbeat_assets = [
    "Animal Science",
    "Arena Auditorium",
    "Arts and Sciences",
    "Aven Nelson",
    "Berry Center",
    "Beta House",
    "Biological Sciences",
    "Centennial Complex",
    "Central Energy Plant",
    "Centrex",
    "Cheney Center",
    "Child Care",
    "Classroom Building",
    "Coe Library",
    "College of Agriculture",
    "College of Business",
    "College of Education",
    "Engineering",
    "College of Law",
    "Corbett",
    "Earth Sciences",
    "Education Annex",
    "Energy Innovation Center",
    "Fieldhouse",
    "Fieldhouse North",
    "Fine Arts",
    "Gateway Center",
    "General Storage",
    "Geological Survey",
    "Geology",
    "HAPC and RAC",
    "Half Acre Gym",
    "Health Science and Pharmacy",
    "High Bay",
    "Hoyt Hall",
    "Information Technology",
    "Indoor Practice Facility",
    "Knight Hall",
    "McWhinnie Hall",
    "Merica Hall",
    "Old Main",
    "Physical Science",
    "RMMC",
    "Ross Hall",
    "Service Building",
    "Stadium",
    "Vet Lab",
    "Visual Arts",
    "WRI and Bureau of Mines",
    "WTBC",
    "Williams Conservatory",
    "Wyoming Hall",
    "Student Union",
]

for asset in campus_heartbeat_assets:
    test_summary(asset)
