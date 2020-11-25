import dataset

def get_db():
    db = dataset.connect('sqlite:///instamatch.db')
    return db


def init_db():
    db = get_db()
    users = db['users']
    users.insert_ignore(dict(username='Kevin07', password='12345', name='Kevin Cai', email='kevin@email.com'), ['username'])
    users.insert_ignore(dict(username='johnk13', password='12345', name='John Kim', email='john@email.com'), ['username'])
    friends = db['friends']
    friends.insert_ignore(dict(username='Kevin07', friend='johnk13'), ['username', 'friend'])
    friends.insert_ignore(dict(username='johnk13', friend='Kevin07'), ['username', 'friend'])
    # create tables
    # populate with sample data


if __name__ == "__main__":
    init_db()
