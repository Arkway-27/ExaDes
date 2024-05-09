from room import Room

dimensions = (5, 4, 3)
walls = [
    {
        "index": 0,
        "facing": "north",
        "length": "5",
    },
    {
        "index": 1,
        "facing": "east",
        "length": "4",
    },
    {
        "index": 2,
        "facing": "south",
        "length": "5",
    },
    {
        "index": 3,
        "facing": "west",
        "length": "4",
    },
]
room = Room("Bedroom", "A cozy bedroom", dimensions)
for wall in walls:
    room.createWall(wall["index"], wall["facing"], wall["coordinates"])


for wall in room.walls:
    if wall.facing == "north":
        room.placeOpening("door", [], wall)
    elif wall.facing == "west":
        room.placeOpening("window", [0, 2, 3], wall)

print(room)
