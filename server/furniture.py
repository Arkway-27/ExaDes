class Furniture:
    def __init__(self, name, coordinates):
        self.name = name
        self.coordinates = coordinates

    def __str__(self):
        return f"{self.name} - {self.coordinates}"
