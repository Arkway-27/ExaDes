from flask import Flask, Blueprint, make_response, send_file

public = Blueprint("public", __name__)


@public.route("/")
def index():
    fileDir = "static/door.glb"
    return make_response(send_file(fileDir, as_attachment=True))
