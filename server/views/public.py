from flask import Flask, Blueprint

public = Blueprint('public', __name__)

@public.route('/')
def index():
    return 'Hello, World!'
