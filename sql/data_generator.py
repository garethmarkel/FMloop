import mysql.connector
from mysql.connector import errorcode

cnx = None

def connectdb():
    global cnx
    try:
        cnx = mysql.connector.connect(user='root', password='password',
        host='127.0.0.1', database='freelance_ai',
        auth_plugin='mysql_native_password')
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

def closedb():
    global cnx
    cnx.close()

def main():
    #print("hi")
    connectdb()
    closedb()

if __name__ == "__main__":
    main()
