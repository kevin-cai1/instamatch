from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db

match = api.namespace('match', description="Managing matching of users")

def test_function(param1, param2):
        print(param1)
        print(param2)
        return "null"

@match.route('/<string:username>')
@match.doc(params={'username': 'Username of current user'})
class Matches(Resource):
    @match.response(200, 'Success')
    @match.doc(description='''
        Add user into match queue
    ''')
    @match.expect(match_details)
    def post(self, username):
        conn = db.get_db()
        j = get_request_json()

        #

        return {
            'result': 'success'
        }

    @match.doc(description='''
        Check if user has a match
    ''')
    def get(self, username):
        
        return {
            'result': 'success'
        }

    @match.doc(description='''
        Remove the user from the match queue
    ''')
    def delete(self, username):

        return {
            'result': 'success'
        }