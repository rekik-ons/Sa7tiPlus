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
    cursor = get_cursor(conn)

    # Utilisation de strip() pour éviter les espaces accidentels
    login_val = data.login.strip()
    password_val = data.password.strip()

    query = """
    SELECT id_profil, profil, login
    FROM profil
    WHERE login = %s AND mot_de_passe = %s
    """

    cursor.execute(query, (login_val, password_val))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return {
            "status": "success",
            "role": user["profil"],
            "id_user": user["id_profil"] 
        }
    else:
        
        raise HTTPException(status_code=401, detail="Login ou mot de passe incorrect")