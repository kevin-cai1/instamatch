from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

app = Flask(__name__)
app.config['ERROR_404_HELP'] = False
CORS(app)
api = Api(app)
