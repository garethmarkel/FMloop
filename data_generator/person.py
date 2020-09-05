class Person:
    def __init__(self, first_name, last_name, email, title, passphrase,
        user_rating, freelancer, zipcode):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.title = title
        self.passphrase = passphrase
        self.user_rating = user_rating
        self.freelancer = freelancer
        self.zipcode = zipcode

    def show_info():
        info = "{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}"

        return info
