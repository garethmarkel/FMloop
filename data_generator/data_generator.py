import random
import os.path
from os import path
from faker import Faker
from datetime import datetime, timedelta

from person import Person
from project import Project

def monthdelta(date, delta):
    m, y = (date.month+delta) % 12, date.year + ((date.month)+delta-1) // 12
    if not m: m = 12
    d = min(date.day, [31,
        29 if y%4==0 and (not y%100==0 or y%400 == 0) else 28,
        31,30,31,30,31,31,30,31,30,31][m-1])
    return date.replace(day=d,month=m, year=y)

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
        # person.show_info()
        person_array.append(person)

        add_person = ("insert into person "
            "(first_name, last_name, email, title, passphrase, user_rating, freelancer, zipcode) "
            "values ('{0}', '{1}', '{2}', '{3}', '{4}', {5}, {6}, {7});\n")
        add_person = add_person.format(first_name, last_name, email, title,
            password, user_rating, is_freelancer, zipcode)

        file.write(add_person)

    return person_array

def pop_project(file, data_gen, person_array):
    project_array = []
    project_id = 2000

    for person in person_array:
        num_of_projects = data_gen.pyint(min_value=1, max_value=10, step=1)

        for x in range(0, num_of_projects):
            project_id += 1
            title = data_gen.bs()
            explanation = data_gen.paragraph(nb_sentences=3)
            price = data_gen.pydecimal(right_digits=2, positive=True, min_value=30, max_value=100)
            due_date = data_gen.date_between_dates(date_start=datetime(2020, 1, 1), date_end=datetime(2020, 12, 30))
            max_created = monthdelta(due_date, -1)
            min_created = monthdelta(due_date, -6)
            created = data_gen.date_between_dates(date_start=min_created, date_end=max_created)
            is_completed = data_gen.boolean(chance_of_getting_true=50)
            min_completion_date = due_date - timedelta(days=7)
            completion_date = data_gen.date_between_dates(date_start=min_completion_date, date_end=due_date) if is_completed else "null"
            contracted = True if is_completed else data_gen.boolean(chance_of_getting_true=50)
            paid = is_completed
            project_phase = "Just started."
            owner_id = person.person_id

            project = Project(project_id, title, explanation, price, due_date, created, completion_date,
                contracted, paid, project_phase, owner_id)
            project.show_info()
            project_array.append(project)

            add_project = ("insert into project "
                "(title, explanation, price, due_date, created, completion_date, contracted, paid, project_phase, owner_id) "
                "values ('{0}', '{1}', {2}, '{3}', '{4}', '{5}', {6}, {7}, '{8}', {9});\n")
            add_project = add_project.format(title, explanation, price, due_date, created, completion_date,
                contracted, paid, project_phase, owner_id)

            file.write(add_project)

    return project_array

def main():
    test_data_file = None

    person_array = []
    project_array = []

    if not path.exists('../sql/freelance_test_data.sql'):
        test_data_file = open("../sql/freelance_test_data.sql", "x")
    else:
        test_data_file = open("../sql/freelance_test_data.sql", "w")

    data_gen = Faker()
    #Uncomment to keep previous data, comment to get new data
    Faker.seed(0)

    person_array = pop_person(test_data_file, data_gen, 10)
    #person_array[0].show_info()
    project_array = pop_project(test_data_file, data_gen, person_array)

    test_data_file.close()

if __name__ == "__main__":
    main()
