import bpy, os, math
from os import listdir
from os.path import isfile, join

def renderRoom(room, jobid):
    model_path = os.path.join(os.getcwd(), "server/static/")
    models = [f for f in listdir(model_path) if (isfile(join(model_path, f)) and f != f"output.glb")]

    for model in models:
        bpy.ops.import_scene.gltf(filepath=f"{model_path}/{model}")

    cube = bpy.data.objects['Cube']
    bpy.data.objects.remove(cube)

    for l in bpy.data.objects:
        print(l)


    verts = []
    for wall in room.walls:
        roomLength = int(wall.length) / 2
        verts.append((roomLength, -roomLength, 0.0))

    door = bpy.data.objects['Door']
    window = bpy.data.objects['Window']
    for wall in room.walls:
        roomLength = int(wall.length) / 2
        roomHeight = int(3)
        def switchCase(argument):
            switcher = {
                "north": 0,
                "south": 2,
                "east": 3,
                "west": 1
            }
            return switcher.get(argument, "Invalid direction")

        a = switchCase(wall.facing)

        for opening in wall.openings:
            if opening.name == "door":
                door.rotation_mode = 'XYZ'
                door.location = (roomLength, 0, 0)
                door.rotation_euler.rotate_axis('Z', math.radians(90*a))
            if opening.name == "window":
                window.rotation_mode = 'XYZ'
                window.location = (roomLength, 0, int(roomHeight) / 2)
                window.rotation_euler.rotate_axis('Z', math.radians(90*a))

        verts.append((int(roomLength), -int(roomLength), int(roomHeight)))

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

    scene = bpy.context.scene
    scene.collection.objects.link(obj)
    bpy.ops.export_scene.fbx(filepath=f"server/jobs/{jobid}-output.fbx", use_visible=True)


