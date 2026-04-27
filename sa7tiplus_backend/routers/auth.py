from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection, get_cursor

router = APIRouter(prefix="/auth", tags=["Authentification"])

class LoginData(BaseModel):
    login: str
    password: str

@router.post("/login")
def login(data: LoginData):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erreur de connexion base de données")
    
    cursor = get_cursor(conn)
    # On vérifie dans la table 'profil' (vu sur tes captures)
    query = "SELECT * FROM profil WHERE login = %s AND mot_de_passe = %s"
    cursor.execute(query, (data.login, data.password))
    user_profil = cursor.fetchone()
    
    cursor.close()
    conn.close()

    if user_profil:
        # On retourne le rôle exact pour la redirection
        return {
            "status": "success",
            "role": user_profil['profil'],  # "Administrateur", "Medecin", etc.
            "id": user_profil['id_profil']
        }
    else:
        raise HTTPException(status_code=401, detail="Login ou mot de passe invalide")