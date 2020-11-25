import dataset

def get_db():
    db = dataset.connect('sqlite:///instamatch.db')
    return db


def init_db():
    db = get_db()
    users = db['users']
    users.insert(dict(username='Kevin07', password='12345', name='Kevin Cai', email='kevin@email.com'))
    users.insert(dict(username='johnk13', password='12345', name='John Kim', email='john@email.com'))
    friends = db['friends']
    friends.insert(dict(username='Kevin07', friend='johnk13'))
    # create tables
    # populate with sample data


if __name__ == "__main__":
    init_db()
