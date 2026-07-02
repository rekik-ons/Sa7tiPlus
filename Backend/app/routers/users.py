from datetime import date

from fastapi import APIRouter, HTTPException
from database import get_db_connection, get_cursor

from pydantic import BaseModel
router = APIRouter(prefix="/users", tags=["Users"])


class UserCreate(BaseModel):
    nom: str
    prenom: str
    cin: str
    tel: str
    email: str
    date_naissance: date
    profil: str
    sexe: str

class ModifierUser(BaseModel):
    email: str
    tel: str



@router.post("/add")
def add_user(user: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True, buffered=True)

    try:
        cursor.execute("SELECT id_profil FROM profil WHERE profil = %s", (user.profil,))
        profil = cursor.fetchone()

        if not profil:
            raise HTTPException(status_code=404, detail="Profil not found")

        id_profil = profil["id_profil"]

        cursor.execute("""
            INSERT INTO users (nom, prenom, cin, tel, email, date_naiss, id_profil, genre, archiver)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, FALSE)
        """, (user.nom, user.prenom, int(user.cin), int(user.tel),
              user.email, user.date_naissance, id_profil, user.sexe))

        conn.commit()
        return {"message": "User added successfully"}

    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
        
@router.get("/all")
def get_users():
    conn = get_db_connection()
    cursor = get_cursor(conn)

    query = """
    SELECT u.id_user, u.nom, u.prenom, u.email, u.tel, u.archiver, p.profil,
    m.specialite
    FROM users u
    JOIN profil p ON u.id_profil = p.id_profil
    LEFT JOIN medecin m ON u.id_user = m.id_user
    WHERE u.archiver = FALSE
    """

    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return users

@router.put("/{id_user}")
def update_dossier(id_user: int, data:ModifierUser ):
    print(">>> id_user: {id_user}") 
    print(">>> data: {data}") 
    conn = get_db_connection()
    cursor = get_cursor(conn)
    query = """
        UPDATE users SET email=%s, tel=%s WHERE id_user = %s
    """
    cursor.execute(query,(
        data.email, data.tel
        ,id_user)
    )
    print(">>> rows affected: {cursor.rowcount}") 
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User modifié avec succès"}

@router.put("/archive/{id_user}")
def archive_user(id_user: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)

  
    cursor.execute("SELECT * FROM users WHERE id_user = %s", (id_user,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")


    cursor.execute(
        "UPDATE users SET archiver = TRUE WHERE id_user = %s",
        (id_user,)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User archived"}


@router.get("/all/{nom}/{prenom}")
def get_user_by_name(nom: str, prenom: str):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    query = """
    SELECT u.id_user, u.nom, u.prenom, u.email, u.tel, p.profil
    FROM users u
    JOIN profil p ON u.id_profil = p.id_profil
    WHERE u.archiver = FALSE AND u.nom = %s AND u.prenom = %s
    """

    cursor.execute(query, (nom, prenom))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        raise HTTPException(status_code=404, detail="patient not found")

    return user
@router.get("/{id_user}")
def get_user_by_id(id_user: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    cursor.execute("""
        SELECT u.id_user, u.nom, u.prenom, u.email, u.tel, p.profil
        FROM users u
        JOIN profil p ON u.id_profil = p.id_profil
        WHERE u.id_user = %s AND u.archiver = FALSE
    """, (id_user,))
    
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user