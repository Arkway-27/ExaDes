import bpy, os, math
from os import listdir
from os.path import isfile, join

def renderRoom(Room)
    model_path = os.path.join(os.getcwd(), "server/static")
    models = [f for f in listdir(model_path) if (isfile(join(model_path, f)) and f != 'output.gltf')]

    for model in models:
        bpy.ops.import_scene.gltf(filepath=f"{model_path}/{model}")

    cube = bpy.data.objects['Cube']
    cube.select_set(True)
    bpy.ops.object.delete()

    rooms = Room("Room", "A room", (10, 10, 10))


    # bpy.ops.object.mode_set(mode='OBJECT')
    # bpy.ops.object.select_all(action='DESELECT')

    verts = []
    for wall in rooms.walls:
        roomLength = wall.length / 2
        verts.append((roomLength, -roomLength, 0.0))

    door = bpy.data.objects['Door']
    window = bpy.data.objects['Window']
    for wall in rooms.walls:
        roomLength = wall.length / 2
        roomHeight = wall.height
        switch wall.facing:
            case "north":
                a = 0
                break
            case "south":
                a = 2
                break
            case "east":
                a = 3
                break
            case "west":
                a = 1
                break
        if wall.openings has "door":
            door.rotation_mode = 'XYZ'
            door.location = (roomLength, 0, 0)
            door.rotation_euler.rotate_axis('Z', math.radians(90*a))
        if wall.openings has "window":
            window.rotation_mode = 'XYZ'
            window.location = (roomLength, 0, roomHeight / 2)
            window.rotation_euler.rotate_axis('Z', math.radians(90*a))
        verts.append((roomLength, -roomLength, roomHeight))

    mesh = bpy.data.meshes.new('Room_Mesh')

    faces = [
        (0, 1, 2, 3),  # Floor
        (3, 2, 6, 7),  # Front
        # (7, 6, 5, 4),  # Back
        (4, 5, 1, 0),  # Left
        (1, 5, 6, 2),  # Right
        (4, 0, 3, 7)   # Top
    ]

    # Create mesh from the vertices and faces
    mesh.from_pydata(verts, [], faces)

    # Create an object from the mesh
    obj = bpy.data.objects.new('Room', mesh)

    # Link the object to the scene
    scene = bpy.context.scene
    scene.collection.objects.link(obj)

    bpy.ops.export_scene.gltf(filepath=f"{model_path}/output.gltf")
