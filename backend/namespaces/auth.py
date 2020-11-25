from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db

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
        conn = db.get_db()
        j = get_request_json()
        users = conn['users']
        data = dict(username=j['username'], password=j['password'])
        
        results = users.find_one(username=j['username'], password=j['password'])

        if (not results):
            auth.abort(400, 'Username or password incorrect' , result='none')

        return {
            "result": "success",
            "username": j['username']
        }

@auth.route('/signup')
class Signup(Resource):
    @auth.response(200, 'Success')
    @auth.expect(signup_details)
    @auth.doc(description='''
        Used to create an account
    ''')
    def post(self):
        conn = db.get_db()
        j = get_request_json()
        users = conn['users']
        try:
            data = dict(username=j['username'], password=j['password'], name=j['name'], email=j['email'])
            result = users.insert_ignore(data, ['username'])
        except KeyError as e:
            auth.abort(400, '{} not provided'.format(e))

        if (not result):
            auth.abort(400, 'User {} already exists'.format(j['username']), result='None')
        return {
            "result": "success",
            "username": j['username']
        }
