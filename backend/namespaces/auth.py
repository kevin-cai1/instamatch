from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *

auth = api.namespace('auth', description="Authentication")

@auth.route('/login')
class Login(Resource):
    @auth.response(200, 'Success')
    @auth.response(400, 'Missing Username/Password')
    @auth.response(403, 'Invalid Username/Password')
    @auth.expect(login_details)
    @auth.doc(description='''
        This is used to authenticate a verified account created through signup.
    ''')

    def post(self):
        j = get_request_json()
        print(j)
        return "login"

@auth.route('/signup')
class Signup(Resource):
    @auth.response(200, 'Success')
    @auth.expect(signup_details)
    @auth.doc(description='''
        Used to create an account
    ''')
    def post(self):
        j = get_request_json()
        return 'signed up'
