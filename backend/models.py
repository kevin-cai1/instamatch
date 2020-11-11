from app import api
from flask_restplus import fields

login_details = api.model('login_details', {
  'username': fields.String(required=True, example='xX_charmander_Xx'),
  'password': fields.String(required=True, example='1234'),
})

signup_details = api.model('signup_details', {
  'username': fields.String(required=True, example='xX_charmander_Xx'),
  'password': fields.String(required=True, example='1234'),
  'name':  fields.String(required=True, example='Charmaine')
})

user_update_details = api.model('user_update_details', {
    'name':  fields.String(example='Charmaine Leung'),
    'password': fields.String(example='12345')
})

