from datetime import date
from fastapi import FastAPI, Form, HTTPException
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="mydb"
)
print("connected to database successfully")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {"message": "Hello, World!"}
@app.get("/get_users")
def get_users():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return {"users": users}

@app.post("/add_users")
def add_user(
    nom: str = Form(...),
    CIN: int = Form(...),
    email: str = Form(...),
    DateNaiss: date = Form(...),
    Tel: str = Form(...),
    genre: str = Form(...),
    Profil_id_Profil1: int = Form(...)

):
    try:
        cursor = conn.cursor()
        # Correction : On passe un seul tuple (name, cin, mail, ...)
        query = """
            INSERT INTO users (nom, CIN, email, DateNaiss, Tel, genre, Profil_id_Profil1) 
            VALUES (%s, %s, %s, %s, %s,  %s, %s)
        """
        values = (nom, CIN, email, DateNaiss, Tel, genre, Profil_id_Profil1)
        
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur {nom} ajouté."}
        
    except Exception as e:
        conn.rollback() # Annule la transaction en cas d'erreur
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")
    
@app.post("/delete_users")
def delete_user(id: int = Form(...)):
    try:
        cursor = conn.cursor()
        query = "DELETE FROM users WHERE id = %s"
        cursor.execute(query, (id,))
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur avec ID {id} supprimé."}
        
    except Exception as e:
        conn.rollback() # Annule la transaction en cas d'erreur
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")  

@app.post("/update_users")
def update_user(
    id: int=Form(...),
    nom: str=Form(...),
    CIN: int=Form(...),
    email: str=Form(...),
    DateNaiss: date=Form(...),
    Tel: str=Form(...),
    genre: str=Form(...),
    Profil_id_Profil1: int=Form(...)
):
    try:
        cursor = conn.cursor()
        query = """
            UPDATE users 
            SET nom=%s,CIN=%s,email=%s,DateNaiss=%s,Tel=%s,genre=%s, Profil_id_Profil1=%s
            WHERE id=%s
        """
        values = (nom, CIN, email, DateNaiss, Tel, genre, Profil_id_Profil1, id)
        
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur avec ID {id} mis à jour."}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")  