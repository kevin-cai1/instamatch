from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db

user = api.namespace('user', description="User information")

@user.route('/<string:username>')
class User(Resource):
    @user.response(200, 'Success')
    @user.doc(description='''
        Handle all operations for given user
    ''')

    def get(self, username):
        # fetch user info for given username
        conn = db.get_db()
        users = conn.get_table('users')
        results = users.find_one(username=username)

        if (not results):
            user.abort(404, 'User {} not found'.format(username), result='none')
            
        return {
            'result': 'success',
            'username': results['username'],
            'name': results['name'],
            'password': results['password']
        }

    @user.doc(description='''
        Delete the user specified by username
    ''')
    def delete(self, username):
        # delete user specified by username
        conn = db.get_db()
        users = conn.get_table('users')
        result = users.delete(username=username)
        if (not result):
            user.abort(404, 'User {} not found'.format(username), result='none')

        return {
            'result': 'success'
        }

    @user.doc(description='''
        Update the user specified by username
    ''')
    @user.expect(user_update_details)
    def put(self, username):
        conn = db.get_db()
        j = get_request_json()
        users = conn.get_table('users')

        data = dict(username=username, password=j['password'], name=j['name'])
        result = users.update(data, ['username'])

        if (not result):
            user.abort(404, 'User {} not found'.format(username), result='none')
            
        return {
            'result': 'success',
            'username': username,
            'password': j['password'],
            'name': j['name']
        }
    