import mysql.connector
import random
from mysql.connector import errorcode
from faker import Faker

def connect_db():
    try:
        cnx = mysql.connector.connect(user='root', password='password',
            host='127.0.0.1', database='freelance_ai',
            auth_plugin='mysql_native_password')
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return "Something is wrong with your user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return "Database does not exist"
        else:
            return err

def pop_person(cursor, data_gen, amount):
    add_person = ("insert into person "
        "(first_name, last_name, email, title, passphrase, user_rating, freelancer) "
        "values (%s, %s, %s, %s, %s, %s, %s)")

    for x in range(0, amount):
        is_freelancer = bool(random.getrandbits(1))
        freelancer_rating = random.uniform(1, 5)
        data_person = (
            data_gen.first_name(),
            data_gen.last_name(),
            data_gen.email(),
            data_gen.job(),
            data_gen.word(),
            freelancer_rating,
            is_freelancer)
        print(data_person)

        cursor.execute(add_person, data_person)

def pop_project(cursor, data_gen):
    get_person = ("SELECT person_id FROM person")
    add_project = ("insert into project "
        "(title, explanation, price, due_date, created, completion_date, contracted, owner_id) "
        "values (%s, %s, %s, %s, %s, %s, %s, %s)")

    cursor.execute(get_person)

    for (person_id) in cursor:
        print(person_id)

def main():
    cnx = connect_db()

    if isinstance(cnx, str):
        print(cnx)
    else:
        cursor = cnx.cursor()
        data_gen = Faker()
        Faker.seed(0)

        pop_person(cursor, data_gen, 10)
        cnx.commit()
        pop_project(cursor, data_gen)

        cursor.close()
        cnx.close()

if __name__ == "__main__":
    main()
