from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db
import time

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
        table = conn['match']
        try:
            data = dict(username=username, activity=j['activity'], tag=j['tag'], end_time=j['end_time'])
        except KeyError as e:
            match.abort(400, '{} not provided'.format(e), result='none')
        
        result = table.upsert(data, ['username'])

        return {
            'result': 'success'
        }

    @match.doc(description='''
        Check if user has a match
    ''')
    def get(self, username):
        conn = db.get_db()
        table = conn['match']

        matched_table = conn['matched']
        # clear outdated record
        current_time = str(time.time()).split('.')[0]
        print(current_time)
        outdated = table.find(end_time={'<':current_time})
        for rec in outdated:
            # delete outdated records
            table.delete(username=rec['username'])


        match = None
        prematched = matched_table.find_one(username=username)
        if (prematched):
            match = prematched['match']
            matched_table.delete(username=username)
        else :
            # find all friends in tag to match with
            results = conn.query('''
                SELECT match.username, match.activity, tags.friend
                FROM match INNER JOIN tags
                    ON match.username = tags.username
                    AND tags.friend != 'None'
                WHERE match.username = :username
            ''', {'username': username})
            # list of potential friends to match
            for record in results:
                # check if any of these friends are also looking
                res = table.find_one(username=record['friend'])
                if (res): # friend is also in queue
                    # check if friend is ok to match with you
                    result = conn.query('''
                        SELECT match.username, match.activity, tags.friend
                        FROM match INNER JOIN tags
                            ON match.username = tags.username
                            AND tags.friend != 'None'
                        WHERE match.username = :username
                    ''', {'username': res['username']})
                    for friend_r in result:
                        if friend_r['friend'] == username and friend_r['activity'] == record['activity']:
                            match = friend_r['username']
                            data = dict(username=match, match=username)
                            matched_table.insert_ignore(data, ['username'])
                            table.delete(username=username)
                            table.delete(username=match)                        
        return {
            'result': 'success',
            'match': match
        }

    @match.doc(description='''
        Remove the user from the match queue
    ''')
    def delete(self, username):
        conn = db.get_db()
        table = conn['match']
        result = table.delete(username=username)

        if (not result):
            table.abort(404, 'User {} not found'.format(username), result='none')
        
        return {
            'result': 'success'
        }

@match.route('/pool')
class MatchPool(Resource):
    @match.doc(description='''
        Debugging function to see match pool
    ''')
    def get(self):
        conn = db.get_db()
        table = conn['match']
        users = []
        for user in conn['match']:
            user_data = {}
            for key in user.keys():
                user_data[key] = user[key]
            users.append(user_data)
        return {
            'result': 'success',
            'users': users
        }