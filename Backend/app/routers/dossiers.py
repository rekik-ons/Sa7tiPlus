from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import get_db_connection, get_cursor

router = APIRouter(prefix="/dossiers", tags=["Dossiers"])

class DossierCreate(BaseModel):
    id_patient: Optional[int] = None
    id_medecin: Optional[int] = None
    allergie: Optional[str] = None
    poids: Optional[float] = None
    taille: Optional[float] = None
    etat_sante: Optional[str] = None
    diagnostic: Optional[str] = None
    traitement: Optional[str] = None
    description: Optional[str] = None
    etat: Optional[str] = "En cours de traitement"

class DossierUpdate(BaseModel):
    allergie: Optional[str] = None
    poids: Optional[float] = None
    taille: Optional[float] = None
    etat_sante: Optional[str] = None
    diagnostic: Optional[str] = None
    traitement: Optional[str] = None
    description: Optional[str] = None
    etat: Optional[str] = None

@router.get("/")
def get_all_dossiers():
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("""
        SELECT d.*, u.nom, u.prenom
        FROM dossier d
        LEFT JOIN patient p ON d.id_patient = p.id_user
        LEFT JOIN users u ON p.id_user = u.id_user
    """)
    dossiers = cursor.fetchall()
    cursor.close()
    conn.close()
    return dossiers
    
# GET un dossier par id
@router.get("/{id_dossier}")
def get_dossier(id_dossier: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("SELECT * FROM dossier WHERE id_dossier = %s", (id_dossier,))
    dossier = cursor.fetchone()
    cursor.close()
    conn.close()
    if not dossier:
        raise HTTPException(status_code=404, detail="Dossier non trouvé")
    return dossier

# POST créer un dossier
@router.post("/")
def create_dossier(data: DossierCreate):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    query = """
        INSERT INTO dossier (id_patient, id_medecin, allergie, poids, taille,
                             etat_sante, diagnostic, traitement, description, etat)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data.id_patient, data.id_medecin, data.allergie, data.poids,
        data.taille, data.etat_sante, data.diagnostic, data.traitement,
        data.description, data.etat
    ))
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"message": "Dossier créé avec succès", "id_dossier": new_id}

# PUT modifier un dossier
@router.put("/{id_dossier}")
def update_dossier(id_dossier: int, data: DossierUpdate):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    query = """
        UPDATE dossier SET allergie=%s, poids=%s, taille=%s, etat_sante=%s,
               diagnostic=%s, traitement=%s, description=%s, etat=%s
        WHERE id_dossier = %s
    """
    cursor.execute(query, (
        data.allergie, data.poids, data.taille, data.etat_sante,
        data.diagnostic, data.traitement, data.description, data.etat,
        id_dossier
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Dossier modifié avec succès"}

    # ARCHIVER DOSSIER
@router.put("/archive/{id_dossier}")
def archive_dossier(id_dossier: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    cursor.execute("SELECT * FROM dossier WHERE id_dossier = %s", (id_dossier,))
    dossier = cursor.fetchone()

    if not dossier:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Dossier not found")

    cursor.execute(
        "UPDATE dossier SET etat = 'Archivé' WHERE id_dossier = %s",
        (id_dossier,)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Dossier archivé"}

# DELETE supprimer un dossier
@router.delete("/{id_dossier}")
def delete_dossier(id_dossier: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("DELETE FROM dossier WHERE id_dossier = %s", (id_dossier,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Dossier supprimé avec succès"}