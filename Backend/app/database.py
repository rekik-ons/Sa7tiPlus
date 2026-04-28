import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="sa7tiplus"
        )
        return conn
    except Error as e:
        print("Erreur connexion:", e)
        return None

def get_cursor(conn):
    return conn.cursor(dictionary=True)