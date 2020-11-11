from flask import request
from flask_restplus import abort

def get_request_json():
    j = request.json
    if not j:
        abort(400, "Expected JSON object")
    return j