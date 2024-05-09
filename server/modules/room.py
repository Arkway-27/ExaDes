class Room:
    def __init__(self, name, description, dimensions):
        self.name = name
        self.description = description
        self.dimensions = dimensions
        self.walls = []
        self.openings = {}
        self.linked_rooms = []
        self.electricalEquipment = []
        self.furniture = []

    def updateOpenings(self):
        for wall in self.walls:
            self.openings[wall.index] = wall.openings

    def createWall(self, index, facing, coordinates):
        wall = Wall(self, index, facing, coordinates)
        self.walls.append(wall)
        self.updateOpenings()
        return wall

    def place_opening(self, name, coordinates, wall):
        opening = Opening(self, name, coordinates)
        wall.openings.append(opening)

    # def addLinkedRoom(self, room, opening):
    #     self.linked_rooms.append(room)

    def place_electrical_equipment(
        self,
        name,
        coordinates,
    ):
        equipment = ElectricalEquipment(self, name, coordinates)
        self.electricalEquipment.append(equipment)
        return ""

    def placeFurniture(self, name, coordinates):
        furniture = Furniture(self, name, coordinates)
        self.furniture.append(furniture)

    def __str__(self):
        return f"""{self.name} - {self.description} - {self.dimensions}
        Linked rooms: {self.linked_rooms}
        Walls: {self.walls}
        Openings: {self.openings}
        Electrical Equipment: {self.electricalEquipment}
        Furniture: {self.furniture}"""


class Object:
    def __init__(self, room, type, name, coordinates):
        self.type = type
        self.name = name
        self.coordinates = coordinates

    def __str__(self):
        return f"{self.type} - {self.coordinates}"


class Opening(Object):
    def __init__(self, room, name, coordinates):
        self.minHorizontalClearance = 0.6
        super().__init__("opening", room, name, coordinates)
        if self.name == "door":
            coordinates[2] = 0
        if self.name == "window":
            coordinates[2] = room.dimensions[2] / 2

    def __str__(self):
        return f"{self.type} - {self.coordinates}"


class ElectricalEquipment(Object):
    def __init__(self, room, name, coordinates):
        super().__init__("electrical-equipment", room, name, coordinates)

    def __str__(self):
        return f"{self.type} - {self.coordinates}"


class Furniture(Object):
    def __init__(self, room, name, coordinates):
        self.name = name
        coordinates[2] = 0
        super().__init__("furniture", room, name, coordinates)

    def __str__(self):
        return f"{self.type} - {self.coordinates}"


class Wall:
    def __init__(self, room, index, facing, coordinates):
        self.index = index
        self.room = room
        self.facing = facing
        self.openings = []
        self.coordinates = coordinates

    def __str__(self):
        return f"""Wall {self.index} - {self.facing} - {self.coordinates}
         {self.openings}"""
