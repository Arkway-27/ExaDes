from room import Room

width = 4
length = 5
height = 3

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

directions = {
    "north": "y",
    "east": "x",
    "south": "-y",
    "west": "-x",
}

room = Room("Bedroom", "A cozy bedroom", (width, length, height))
for wall in walls:
    room.createWall(wall["index"], wall["facing"], wall["coordinates"])


def setWallCoordinates(room, wall):
    if wall.facing == "north":
        wall.coordinates[0] = 0
        wall.coordinates[1] = room.dimensions[0] / 2
    elif wall.facing == "east":
        wall.coordinates[0] = room.dimensions[1] / 2
        wall.coordinates[1] = 0
    elif wall.facing == "south":
        wall.coordinates[0] = 0
        wall.coordinates[1] = -room.dimensions[0] / 2
    elif wall.facing == "west":
        wall.coordinates[0] = -room.dimensions[1] / 2
        wall.coordinates[1] = 0


def setOpeningCoordinates( wall, opening):
    if wall.facing == "north":
        opening.coordinates[0] = wall.coordinates[0]
        opening.coordinates[1] = wall.coordinates[1] + wall.length / 2
    elif wall.facing == "east":
        opening.coordinates[0] = wall.coordinates[0] + wall.length / 2
        opening.coordinates[1] = wall.coordinates[1]
    elif wall.facing == "south":
        opening.coordinates[0] = wall.coordinates[0]
        opening.coordinates[1] = wall.coordinates[1] - wall.length / 2
    elif wall.facing == "west":
        opening.coordinates[0] = wall.coordinates[0] - wall.length / 2
        opening.coordinates[1] = wall.coordinates[1]


print(room)
