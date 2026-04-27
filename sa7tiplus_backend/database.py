import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",  # Laisse vide si tu n'as pas de mot de passe
            database="sa7tiplus"
        )
        if conn.is_connected():
            return conn
    except Error as e:
        print(f"Erreur lors de la connexion à MySQL: {e}")
        return None

# Cette fonction permet de récupérer un curseur qui retourne des dictionnaires
# C'est très pratique pour FastAPI car cela génère du JSON automatiquement
def get_cursor(conn):
    return conn.cursor(dictionary=True)