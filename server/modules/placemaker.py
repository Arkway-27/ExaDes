from room import Room

dimensions = (5, 4, 3)
walls = [
    {
        "index": 0,
        "facing": "north",
        "coordinates": [0, 0, 10],
        "openings": [{"name": "door", "coordinates": [4, 0, 2]}],
    },
    {"index": 1, "facing": "east", "coordinates": [10, 0, 6], "openings": []},
    {"index": 2, "facing": "south", "coordinates": [10, 6, 0], "openings": []},
    {
        "index": 3,
        "facing": "west",
        "coordinates": [0, 6, 0],
        "openings": [{"name": "window", "coordinates": [0, 2, 3]}],
    },
]
room = Room("Bedroom", "A cozy bedroom", dimensions)
for wall in walls:
    room.createWall(wall["index"], wall["facing"], wall["coordinates"])

for wall in room.walls:
    print(wall)
