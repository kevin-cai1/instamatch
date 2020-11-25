import dataset

def get_db():
    db = dataset.connect('sqlite:///instamatch.db')
    return db


def init_db():
    db = get_db()
    users = db['users']
    users.insert(dict(username='Kevin07', password='12345', name='Kevin Cai', email='kevin@email.com'))
    # create tables
    # populate with sample data


if __name__ == "__main__":
    init_db()
