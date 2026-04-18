from datetime import date
from fastapi import FastAPI, Form, HTTPException
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sa7tiplus"
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
    prenom: str = Form(...),
    cin: int = Form(...),
    email: str = Form(...),
    tel: str = Form(...),
    date_naiss: date = Form(...),
    genre: str = Form(...),
    id_profil: int = Form(...)

):
    try:
        cursor = conn.cursor()
        query = """
            INSERT INTO users (nom, prenom, cin, email, date_naiss, tel, genre, id_profil) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (nom, prenom, cin, email, date_naiss, tel, genre, id_profil)
        
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur {nom} ajouté."}
        
    except Exception as e:
        conn.rollback() 
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")
    
@app.post("/delete_users")
def delete_user(id: int = Form(...)):
    try:
        cursor = conn.cursor()
        query = "DELETE FROM users WHERE id_user = %s"
        cursor.execute(query, (id,))
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur avec ID {id} supprimé."}
        
    except Exception as e:
        conn.rollback() 
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")  

@app.post("/update_users")
def update_user(
    id_user: int = Form(...),
    nom: str = Form(...),
    prenom: str = Form(...),
    cin: int = Form(...),
    email: str = Form(...),
    tel: str = Form(...),
    date_naiss: date = Form(...),
    genre: str = Form(...),
    id_profil: int = Form(...)
):
    try:
        cursor = conn.cursor()
        query = """
            UPDATE users 
            SET nom=%s,prenom=%s,cin=%s,email=%s,date_naiss=%s,tel=%s,genre=%s,id_profil=%s
            WHERE id_user= %s
        """
        values = (nom, prenom, cin, email, date_naiss, tel, genre, id_profil, id_user)
        
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        
        return {"status": "success", "message": f"Utilisateur avec ID {id} mis à jour."}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")  