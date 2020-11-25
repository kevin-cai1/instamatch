from app import api
from flask_restplus import fields

login_details = api.model('login_details', {
  'username': fields.String(required=True, example='xX_charmander_Xx'),
  'password': fields.String(required=True, example='1234'),
})

signup_details = api.model('signup_details', {
  'username': fields.String(required=True, example='xX_charmander_Xx'),
  'email': fields.String(required=True, example='charmander@gmail.com'),
  'password': fields.String(required=True, example='1234'),
  'name':  fields.String(required=True, example='Charmaine')
})

user_update_details = api.model('user_update_details', {
    'name':  fields.String(example='Charmaine Leung'),
    'password': fields.String(example='12345'),
    'email': fields.String(example='charmaine2@gmail.com')
})

friend_details = api.model('friend_details', {
  'friend_name': fields.String(example='johnk13')
})

tag_details = api.model('tag_details', {
  'tag_name': fields.String(example='swimming')
})

friend_tags = api.model('friend_tags', {
  'tag_name': fields.String(example='swimming'),
  'friend': fields.String(example='johnk13')
})