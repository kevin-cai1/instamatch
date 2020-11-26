from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db

friends = api.namespace('friends', description="Managing users friends")

@friends.route('/<string:username>')
@friends.doc(params={'username': 'Username of current user'})
class Friends(Resource):
    @friends.response(200, 'Success')
    @friends.doc(description='''
        Delete friendship/requests between username and friend_name
    ''')
    @friends.expect(friend_details)
    def delete(self, username):
        # currently deletes friends as well as requests
        conn = db.get_db()
        j = get_request_json()
        table = conn.get_table('friends')
        result = table.delete(username=username, friend=j['friend_name'])
        result2 = table.delete(username=j['friend_name'], friend=username)
        if (not(result and result2)):
            friends.abort(404, 'Users {} and {} not friends'.format(username, j['friend_name']), result='none')

        return {
            'result': 'success'
        }

    @friends.doc(description='''
        Add/accept a new friend specified by friend_name to username 
    ''')
    @friends.expect(friend_details)
    def post(self, username):
        conn = db.get_db()
        j = get_request_json()
        table = conn['friends']
        try:
            data = dict(username=username, friend=j['friend_name'])
        except KeyError as e:
            friends.abort(400, '{} not provided'.format(e), result='none')
        # check that both users exist

        result = table.insert_ignore(data, ['username', 'friend'])
        if (not result):
            friends.abort(400, 'User {} is already friends with {}'.format(username, j['friend_name']), result='none')

        return {
            "result": "success"
        }

@friends.route('/<string:username>/<string:friendname>')
class FriendStatus(Resource):
    @friends.doc(description='''
        Get friend status between username and friend_name
    ''')
    def get(self, username, friendname):
        conn = db.get_db()
        table = conn['friends']
        
        userToFriend = table.find_one(username=username, friend=friendname)

        friendToUser = table.find_one(username=friendname, friend=username)
        
        return_val = {}

        if (userToFriend and friendToUser):
            return_val = {"result": "success", "status": "friends"}
        elif (userToFriend):
            return_val = {"result": "success", "status": "request sent to {}".format(friendname)}
        elif (friendToUser):
            return_val = {"result": "success", "status": "request received from {}".format(friendname)}
        else:
            return_val = {"result": "success", "status": "none"}
        
        return return_val
    
@friends.route('/<string:username>/all')
class AllFriends(Resource):
    @friends.doc(description='''
        Get all friends for user of username
    ''')
    def get(self, username):
        conn = db.get_db()
        table = conn['friends']

        results = conn.query('''
            SELECT f1.friend 
            FROM friends f1 INNER JOIN friends f2 
                ON f1.username = f2.friend 
                AND f1.friend = f2.username 
            WHERE f1.username <> f1.friend
            AND f1.friend != :username
        ''', {'username':username})
        
        friends = []
        for res in results:
            friends.append(res['friend'])

        if (not results):
            friends.abort(404, 'User {} not found'.format(username), result='none')

        return_val = {
            "username": username,
            "friends": friends
        }

        return return_val

@friends.route('/<string:username>/requests')
class FriendRequests(Resource):
    @friends.doc(description='''
        Get all outstanding friend requests username has from other people 
    ''')
    def get(self, username):
        conn = db.get_db()
        table = conn['friends']
        
        results = table.find(friend=username)
        print(results)
        friends = []
        for res in results:
            friends.append(res['username'])

        if (not results):
            friends.abort(404, 'User {} not found'.format(username), result='none')

        return_val = {
            "username": username,
            "requests": friends
        }

        return return_val

@friends.route('/<string:username>/pending')
class PendingRequests(Resource):
    @friends.doc(description='''
        Get all pending friend requests username has sent
    ''')
    def get(self, username):
        conn = db.get_db()
        table = conn['friends']
        
        results = table.find(username=username)
        print(results)
        friends = []
        for res in results:
            friends.append(res['friend'])

        if (not results):
            friends.abort(404, 'User {} not found'.format(username), result='none')

        return_val = {
            "username": username,
            "pending": friends
        }

        return return_val

@friends.route('/search/<string:name>')
class SearchFriend(Resource):
    @friends.doc(description='''
        Find all user results with friend_name a substring of their name (search function)
    ''')
    def get(self, name):
        conn = db.get_db()

        users = []
        results = conn.query('SELECT * FROM users WHERE username LIKE :n', {'n': name + '%'})
        
        for res in results:
            users.append(res['username'])

        return {
           "users": users
        }