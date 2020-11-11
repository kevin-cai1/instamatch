from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *

user = api.namespace('user', description="User information")

@user.route('/<string:username>')
class User(Resource):
    @user.response(200, 'Success')
    @user.doc(description='''
        Handle all operations for given user
    ''')

    def get(self, username):
        # fetch user info for given username
        return "user info"

    @user.doc(description='''
        Delete the user specified by username
    ''')
    def delete(self, username):
        # delete user specified by username
        return True

    @user.expect(user_update_details)
    def put(self, username):
        # update details
        j = get_request_json()
        print(j)
        return True
    