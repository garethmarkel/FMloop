class Person:
    def __init__(self, person_id, first_name, last_name, email, title, passphrase,
        user_rating, freelancer, zipcode):
        self.person_id = person_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.title = title
        self.passphrase = passphrase
        self.user_rating = user_rating
        self.freelancer = freelancer
        self.zipcode = zipcode

    def show_info(self):
        info = "{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}"
        info = info.format(self.person_id, self.first_name, self.last_name, self.email, self.title,
            self.passphrase, self.user_rating, self.freelancer, self.zipcode)

        print(info)
