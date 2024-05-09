class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.linked_rooms = []
        self.openings = []
        self.electricalEquipment = []
        self.furniture = []

    def add_linked_room(self, room_to_add, opening):
        self.linked_rooms.append(room_to_add)
        self.openings.append(opening)

    def add_electrical_equipment(self, equipment):
        self.electricalEquipment.append(equipment)

    def add_furniture(self, furniture):
        self.furniture.append(furniture)

    def __str__(self):

        return f"""{self.name} - {self.description}\n
        Linked rooms: {self.linked_rooms}\n
        Openings: {self.openings}\n
        Electrical Equipment: {self.electricalEquipment}\n
        Furniture: {self.furniture}"""

