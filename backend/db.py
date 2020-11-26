import dataset

def get_db():
    db = dataset.connect('sqlite:///instamatch.db')
    return db


def init_db():
    db = get_db()
    users = db['users']
    users.insert_ignore(dict(username='Kevin07', password='12345', name='Kevin Cai', email='kevin@email.com'), ['username'])
    users.insert_ignore(dict(username='johnk13', password='12345', name='John Kim', email='john@email.com'), ['username'])
    users.insert_ignore(dict(username='miran', password='12345', name='Miran Nakamura', email='miran@email.com'), ['username'])
    users.insert_ignore(dict(username='char', password='12345', name='Charmaine Leung', email='char@email.com'), ['username'])
    friends = db['friends']
    # kevin <-> john
    # kevin <-> char
    # kevin <- miran
    # john -> miran
    # john <-> char
    friends.insert_ignore(dict(username='Kevin07', friend='johnk13'), ['username', 'friend'])
    friends.insert_ignore(dict(username='Kevin07', friend='char'), ['username', 'friend'])
    friends.insert_ignore(dict(username='miran', friend='Kevin07'), ['username', 'friend'])
    friends.insert_ignore(dict(username='char', friend='Kevin07'), ['username', 'friend'])
    friends.insert_ignore(dict(username='johnk13', friend='Kevin07'), ['username', 'friend'])
    friends.insert_ignore(dict(username='johnk13', friend='miran'), ['username', 'friend'])
    friends.insert_ignore(dict(username='johnk13', friend='char'), ['username', 'friend'])
    friends.insert_ignore(dict(username='char', friend='johnk13'), ['username', 'friend'])
    tags = db['tags']
    tags.insert_ignore(dict(username='Kevin07', tag='close friends'), ['username', 'tag'])
    tags.insert_ignore(dict(username='Kevin07', tag='close friends', friend='johnk13'), ['username', 'tag', 'friend'])
    tags.insert_ignore(dict(username='Kevin07', tag='close friends', friend='char'), ['username', 'tag', 'friend'])
    
    tags.insert_ignore(dict(username='johnk13', tag='uni friends'), ['username', 'tag'])
    tags.insert_ignore(dict(username='johnk13', tag='uni friends', friend='miran'), ['username', 'tag', 'friend'])
    tags.insert_ignore(dict(username='johnk13', tag='uni friends', friend='Kevin07'), ['username', 'tag', 'friend'])

    match = db['match']
    match.upsert(dict(username='Kevin07', activity='gym', tag='close friends', end_time='1606301300'), ['username'])
    match.upsert(dict(username='johnk13', activity='gym', tag='uni friends', end_time='1606301300'), ['username'])
    # create tables
    # populate with sample data


if __name__ == "__main__":
    init_db()
