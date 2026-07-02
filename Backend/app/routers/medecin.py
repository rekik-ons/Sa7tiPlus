from fastapi import APIRouter, HTTPException
from database import get_db_connection, get_cursor

router = APIRouter(prefix="/medecin", tags=["Medecin"])


@router.get("/specialite/{specialite}")
def get_medecins_by_specialite(specialite: str):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erreur connexion DB")
    cursor = get_cursor(conn)
    cursor.execute("""
        SELECT u.id_user, u.nom, u.prenom
        FROM users u
        JOIN medecin m ON u.id_user = m.id_user
        WHERE m.specialite = %s
    """, (specialite,))
    medecins = cursor.fetchall()
    cursor.close()
    conn.close()
    return medecins