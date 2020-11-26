from app import api
from flask_restplus import Resource, fields
from flask import request
from models import *
from helpers import *
import db

tags = api.namespace('tags', description="Managing users tags")

@tags.route('/<string:username>')
@tags.doc(params={'username': 'Username of current user'})
class Tags(Resource):
    @tags.response(200, 'Success')
    @tags.doc(description='''
        Delete tag for given user
    ''')
    @tags.expect(tag_details)
    def delete(self, username):
        conn = db.get_db()
        j = get_request_json()

        table = conn['tags']
        result = table.delete(username=username, tag=j['tag_name'])

        if (not result):
            tags.abort(404, "Tag '{}' not found for user '{}'".format(j['tag_name'], username), result='none')
        
        return {
            'result': 'success'
        }
    
    @tags.doc(description='''
        Get all tags for given user
    ''')
    def get(self, username):
        conn = db.get_db()
        table = conn['tags']
        result = table.distinct('tag', username=username)

        all_tags = []

        for tag in result:
            all_tags.append(tag['tag'])

        return {
            'result': 'success',
            'tags': all_tags
        }
        
    @tags.doc(description='''
        Create new tag for given user
    ''')
    @tags.expect(tag_details)
    def post(self, username):
        conn = db.get_db()
        j = get_request_json()
        # add tag to db
        table = conn['tags']
        try:
            data = dict(username=username, tag=j['tag_name'])
        except KeyError as e:
            tags.abort(400, '{} not provided'.format(e), result='none')
        
        result = table.insert_ignore(data, ['username', 'tag'])
        if (not result):
            tags.abort(400, 'User {} already has tag {}'.format(username, j['tag_name']), result='none')
        return {
            'result': 'success'
        }

@tags.route('/friends/<string:username>')
@tags.doc(params={'username': 'Username of current user'})
class FriendTags(Resource):
    @tags.doc(description='''
        Add a friend to a tag
    ''')
    @tags.expect(friend_tags)
    def post(self, username):
        conn = db.get_db()
        j = get_request_json()
        # add user to specific tag
        table = conn['tags']
        try:
            data = dict(username=username, tag=j['tag_name'], friend=j['friend'])
        except KeyError as e:
            tags.abort(400, '{} not provided'.format(e), result='none')
        
        result = table.insert_ignore(data, ['username', 'tag', 'friend'])
        if (not result):
            tags.abort(400, 'User {} already has tag {}'.format(username, j['tag_name']), result='none')
        return {
            'result': 'success'
        }
        
    @tags.expect(friend_tags)
    @tags.doc(description='''
        Delete a friend from a tag
    ''')
    def delete(self, username):
        conn = db.get_db()
        j = get_request_json()
        table  = conn['tags']
        try:
            result = table.delete(username=username, tag=j['tag_name'], friend=j['friend'])
        except KeyError as e:
            tags.abort(400, '{} not defined'.format(e), result='none')
            
        return {
            'result': 'success'
        }

@tags.route('/<string:username>/<string:tag>')
@tags.doc(params={'username': 'Username of current user', 'tag': 'Tag to find friend for'})
class FriendsInTag(Resource):
    @tags.doc(description='''
        Get all friends under given tag
    ''')
    def get(self, username, tag):
        conn = db.get_db()
        # add user to specific tag
        table = conn['tags']
        try:
           result = table.find(username=username, tag=tag)
        except KeyError as e:
            tags.abort(400, '{} not provided'.format(e), result='none')

        users = []
        for res in result:
            if (res['friend'] != None):
                users.append(res['friend'])
        
        if (len(users) == 0):
            tags.abort(404, "Tag '{}' not found for user '{}'".format(username, tag), result='none')

        return {
            'result': 'success',
            'tag': tag,
            'friends': users
        }