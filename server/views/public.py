from flask import Flask, Blueprint, make_response, send_file, request

# from server.modules.convertToBlender import renderRoom
import uuid

from server.modules.room import Room

public = Blueprint("public", __name__)


@public.route("/")
def index():
    fileDir = "static/room.glb"
    return make_response(send_file(fileDir, as_attachment=True))


@public.route("/createJob", methods=["POST"])
def createJob():
    data = request.json
    print(data)
    jobid = uuid.uuid4()
    room = Room("Room", "A room", (data.width, data.length, 3))
    for wall in data.walls:
        room.createWall(wall["index"], wall["facing"], (0, 0, 0))
    # renderRoom(room, jobid)
    return {"jobid": jobid}


@public.route("/getModel", methods=["GET"])
def getModel():
    jobid = request.args.get("jobid")
    fileDir = f"jobs/{jobid}-output.gltf"
    return make_response(send_file(fileDir, as_attachment=True))
