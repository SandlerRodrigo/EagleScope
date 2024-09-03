import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

# Segmented routes from one of JSON responses
segmented_routes = [
    [
        {"lat": 40.748817, "lng": -73.985428},
        {"lat": 40.748441, "lng": -73.985664},
        {"lat": 40.741895, "lng": -73.989308},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.712776, "lng": -74.005974},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.706192, "lng": -74.00916},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.752726, "lng": -73.977229},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.758896, "lng": -73.98513},
        {"lat": 40.761432, "lng": -73.977621},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.779437, "lng": -73.963244},
        {"lat": 40.748817, "lng": -73.985428}
    ],
    [
        {"lat": 40.73061, "lng": -73.935242},
        {"lat": 40.748817, "lng": -73.985428}
    ]
]

total_distance = 0
for segment in segmented_routes:
    for i in range(len(segment) - 1):
        total_distance += haversine(segment[i]["lat"], segment[i]["lng"], segment[i+1]["lat"], segment[i+1]["lng"])

print(f"Total calculated distance: {total_distance:.2f} km")