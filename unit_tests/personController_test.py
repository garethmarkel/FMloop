from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest

# function to test createAccount
# create current functionality: create new account, reject existing user, other unkown error
# login current functionality: account doesn't exist, password matches, password doesn't match
class TestCreateLoginAccount(unittest.TestCase):

    def setUp(self):
        time.sleep(5)
        self.driver = webdriver.Chrome()
        driver = self.driver
        driver.get("localhost:3000")
        time.sleep(5)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # create_login = driver.find_elements_by_tag_name("a")


    def test_create_account_basic(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        # 2 is login, 3 is create account
        create_login[3].click()
        time.sleep(5)
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("first_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")
        driver.find_element_by_name("confirm_password").send_keys("a")
        # hit enter and send that shit
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be created successfully, should redirect us
        assert "/login" in driver.current_url

    def test_create_account_existing_user(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[3].click()
        time.sleep(5)
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("first_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")
        driver.find_element_by_name("confirm_password").send_keys("a")
        # hit enter and send
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be rejected if run after basic test
        assert "User already exists. Please use a new email." in driver.page_source
        assert "/login" not in driver.current_url
        assert "/create-account" in driver.current_url

    def test_create_account_reject_accept(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[3].click()
        time.sleep(5)
        # now we are on the actual create account page
        driver.find_element_by_name("email").send_keys('a')
        driver.find_element_by_name("first_name").send_keys('a')
        driver.find_element_by_name("last_name").send_keys('a')
        driver.find_element_by_name("password").send_keys('a')
        driver.find_element_by_name("confirm_password").send_keys('a')
        # hit enter and send that shit
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be rejected if run after basic test
        assert "User already exists. Please use a new email." in driver.page_source
        assert "/login" not in driver.current_url
        assert "/create-account" in driver.current_url

        driver.find_element_by_name("email").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("email").send_keys("b")
        driver.find_element_by_name("first_name").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("first_name").send_keys("b")
        driver.find_element_by_name("last_name").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("last_name").send_keys("b")
        driver.find_element_by_name("password").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("password").send_keys("b")
        driver.find_element_by_name("confirm_password").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("confirm_password").send_keys("b")
        driver.find_element_by_name("confirm_password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should not be rejected
        assert "User already exists. Please use a new email." not in driver.page_source
        assert "/login" in driver.current_url

    def test_login_basic_accept(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[2].click()
        time.sleep(5)
        # now we are on the login page
        driver.find_element_by_name("email").send_keys('a')
        driver.find_element_by_name("password").send_keys('a')
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should now be redirected to dashboard
        assert "/dashboard" in driver.current_url
        assert "Hello, a" in driver.page_source

    def test_login_no_account(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[2].click()
        time.sleep(5)
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("c")
        driver.find_element_by_name("password").send_keys("c")
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be rejected and not redirected
        assert "/login" in driver.current_url
        assert "/dashboard" not in driver.current_url

    def test_login_wrong_password(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[2].click()
        time.sleep(5)
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("password").send_keys("c")
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should not be redirected
        assert "/login" in driver.current_url
        assert "/dashboard" not in driver.current_url

    def test_edit_account_basic(self):
        # self.driver = webdriver.Chrome()
        driver = self.driver
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        create_login = driver.find_elements_by_tag_name("a")
        create_login[2].click()
        time.sleep(5)
        # now we are on the login page
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("password").send_keys("a")
        # hit enter and send
        driver.find_element_by_name("password").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be redirected to dashboard
        assert "/dashboard" in driver.current_url
        assert "Hello, a" in driver.page_source
        # click to edit account and redirect us
        edit_acc_project = driver.find_elements_by_tag_name("a")
        edit_acc_project[0].click()
        time.sleep(5)
        assert "/edit-account" in driver.current_url
        # change to aa
        driver.find_element_by_name("email").send_keys("a")
        driver.find_element_by_name("first_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys("a")
        driver.find_element_by_name("last_name").send_keys(Keys.RETURN)
        time.sleep(5)
        # should be redirected to dashboard
        assert "/dashboard" in driver.current_url
        assert "Hello, aa" in driver.page_source
        # let's change it back and make sure that works
        edit_acc_project = driver.find_elements_by_tag_name("a")
        edit_acc_project[0].click()
        time.sleep(5)
        assert "/edit-account" in driver.current_url
        driver.find_element_by_name("email").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("first_name").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("last_name").send_keys(Keys.BACKSPACE)
        driver.find_element_by_name("last_name").send_keys(Keys.RETURN)
        time.sleep(5)
        assert "/dashboard" in driver.current_url
        assert "Hello, a" in driver.page_source


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
