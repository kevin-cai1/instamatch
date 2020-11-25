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
        Get info for given user
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
            'email': results['email'],
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

        data = {}
        data['username'] = username
        for key in j.keys():
            data[key] = j[key]
        
        result = users.update(data, ['username'])

        if (not result):
            user.abort(404, 'User {} not found'.format(username), result='none')
        
        return_val = data
        return_val['result'] = 'success'
        return return_val

@user.route('/all')
class AllUsers(Resource):
    @user.response(200, 'Success')
    @user.doc(description='''
        Get all users
    ''')

    def get(self):
        # fetch all user info
        users = conn.get_table('users')

        all_users = []

        for user in users:
            user_details = {}
            for key in user.keys():
                user_details[key] = user[key]
            all_users.append(user_details)
            
        return {
            'result': 'success',
            'users': all_users
        }    