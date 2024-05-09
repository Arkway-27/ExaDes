from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    from .views import public
    app.register_blueprint(public.public)


    return app
