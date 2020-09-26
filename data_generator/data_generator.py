import random
import os.path
from os import path
from faker import Faker
from person import Person

def pop_person(file, data_gen, amount):
    person_array = []
    person_id = 1000

    for x in range(0, amount):
        person_id += 1
        is_freelancer = data_gen.boolean(chance_of_getting_true=50)
        user_rating = data_gen.pydecimal(left_digits=1, right_digits=1, positive=True, min_value=1, max_value=5)
        first_name = data_gen.first_name()
        last_name = data_gen.last_name()
        email = first_name + "." + last_name + "@gmail.com"
        email = email.lower()
        title = data_gen.job()
        password = data_gen.word()
        zipcode = data_gen.postcode()

        person = Person(person_id, first_name, last_name, email, title, password,
            user_rating, is_freelancer, zipcode)
        person.show_info()
        person_array.append(person)

        add_person = ("insert into person "
            "(first_name, last_name, email, title, passphrase, user_rating, freelancer, zipcode) "
            "values ('{0}', '{1}', '{2}', '{3}', '{4}', {5}, {6}, {7});\n")
        add_person = add_person.format(first_name, last_name, email, title,
            password, user_rating, is_freelancer, zipcode)

        #print(add_person)
        file.write(add_person)

    return person_array

def pop_project(cursor, data_gen):
    get_person = ("SELECT person_id FROM person")
    add_project = ("insert into project "
        "(title, explanation, price, due_date, created, completion_date, contracted, owner_id) "
        "values (%s, %s, %s, %s, %s, %s, %s, %s)")

    cursor.execute(get_person)

    for (person_id) in cursor:
        print(person_id)

def main():
    test_data_file = None

    person_array = None

    if not path.exists('../sql/freelance_test_data.sql'):
        test_data_file = open("../sql/freelance_test_data.sql", "x")
    else:
        open("../sql/freelance_test_data.sql", "w").close()
        test_data_file = open("../sql/freelance_test_data.sql", "w")

    data_gen = Faker()
    #Uncomment to keep previous data, comment to get new data
    Faker.seed(0)

    person_array = pop_person(test_data_file, data_gen, 10)
    #person_array[0].show_info()
    #pop_project(cursor, data_gen)

    test_data_file.close()

if __name__ == "__main__":
    main()
