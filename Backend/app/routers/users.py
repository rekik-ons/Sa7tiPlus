from fastapi import APIRouter, HTTPException
from database import get_db_connection, get_cursor

router = APIRouter(prefix="/users", tags=["Users"])

# =========================
# GET USERS (non archivés)
# =========================
@router.get("/all")
def get_users():
    conn = get_db_connection()
    cursor = get_cursor(conn)

    query = """
    SELECT u.id_user, u.nom, u.prenom, u.email, u.tel, p.profil
    FROM users u
    JOIN profil p ON u.id_profil = p.id_profil
    WHERE u.archiver = FALSE
    """

    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return users


# =========================
# ARCHIVER USER
# =========================
@router.put("/archive/{id_user}")
def archive_user(id_user: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    # vérifier existence
    cursor.execute("SELECT * FROM users WHERE id_user = %s", (id_user,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

    # update
    cursor.execute(
        "UPDATE users SET archiver = TRUE WHERE id_user = %s",
        (id_user,)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User archived"}