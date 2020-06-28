from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest

# function to test createAccount
# create current functionality: create new account, reject existing user, other unkown error
# login current functionality: account doesn't exist, password matches, password doesn't match
class TestCreateLoginAccount(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        driver.get("localhost:3000")
        create_login = driver.find_elements_by_tag_name("a")

    def test_create_account_basic(self):
        create_login[1].click()
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("first_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")
        driver.find_element_by_name("confirm_password").send_keys("a")
        # hit enter and send that shit
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        # should be created successfully, should redirect us
        assert "/login" in driver.current_url

    def test_create_account_existing_user(self):
        create_login[1].click()
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("first_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")
        driver.find_element_by_name("confirm_password").send_keys("a")
        # hit enter and send
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        # should be rejected if run after basic test
        assert "User already exists. Please use a new email." in driver.page_source
        assert "/login" in driver.current_url

    def test_create_account_reject_accept(self):
        create_login[1].click()
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys('a')
        driver.find_element_by_name("first_name").send_keys('a')
        driver.find_element_by_name("last_name").send_keys('a')
        driver.find_element_by_name("password").send_keys('a')
        driver.find_element_by_name("confirm_password").send_keys('a')
        # hit enter and send that shit
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        # should be rejected if run after basic test
        assert "User already exists. Please use a new email." in driver.page_source
        assert "/login" in driver.current_url
        assert "/create-account" not in driver.current_url

        driver.find_element_by_name("email").send_keys("b")
        driver.find_element_by_name("first_name").send_keys("b")
        driver.find_element_by_name("last_name").send_keys("b")
        driver.find_element_by_name("password").send_keys("b")
        driver.find_element_by_name("confirm_password").send_keys("b")
        # should not be rejected
        assert "User already exists. Please use a new email." not in driver.page_source
        assert "/create-account" in driver.current_url

    def test_login_basic_accept(self):
        create_login[0].click()
        # now we are on the login page
        driver.find_element_by_name("email").send_keys('a')
        driver.find_element_by_name("password").send_keys('a')
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        # should now be redirected to BLANK
        assert ""

    def test_login_no_account(self):
        create_login[0].click()
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("c")
        driver.find_element_by_name("password").send_keys("c")
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        # should be rejected and not redirected
        assert "/login" in driver.current_url
        assert ""

    def test_login_wrong_password(self):
        create_login[0].click()
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("password").send_keys("c")
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        # TODO add assertion that this failed

    def test_edit_account_basic(self):
        create_login[0].click()
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
