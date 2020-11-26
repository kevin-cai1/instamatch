import sys

""" try: """
from app import app
import namespaces.auth
import namespaces.user
import namespaces.friends
import namespaces.match
import namespaces.tags
app.run(debug=True)
""" except ImportError as e:
    print('ERROR:', e, file=sys.stderr)
    if sys.version_info < (3,6):
        print('The backend requires Python 3.6 or later - you appear to be using Python {}.{}'.format(*sys.version_info), file=sys.stderr)
    else:
        print('A module required by the backend is missing.', file=sys.stderr) """
