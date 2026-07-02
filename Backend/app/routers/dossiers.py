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

@router.post("/")
def create_dossier(data: DossierCreate):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    
    cursor.execute("""
        SELECT u.id_user FROM users u
        JOIN profil p ON u.id_profil = p.id_profil
        WHERE u.id_user = %s AND p.profil = 'Patient'
    """, (data.id_patient,))
    user = cursor.fetchone()
    if not user:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Cet utilisateur n'est pas un patient valide.")

   
    cursor.execute("SELECT id_user FROM patient WHERE id_user = %s", (data.id_patient,))
    patient = cursor.fetchone()
    if not patient:
        cursor.execute("INSERT INTO patient (id_user) VALUES (%s)", (data.id_patient,))
        conn.commit()

   
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


@router.delete("/{id_dossier}")
def delete_dossier(id_dossier: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("DELETE FROM dossier WHERE id_dossier = %s", (id_dossier,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Dossier supprimé avec succès"}

@router.put("/{id_dossier}")
def update_dossier(id_dossier: int, data: DossierUpdate):
    conn = get_db_connection()
    cursor = get_cursor(conn)

    cursor.execute("SELECT * FROM dossier WHERE id_dossier = %s", (id_dossier,))
    dossier = cursor.fetchone()

    if not dossier:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Dossier non trouvé")

    fields = []
    values = []

    if data.allergie is not None:
        fields.append("allergie = %s")
        values.append(data.allergie)
    if data.poids is not None:
        fields.append("poids = %s")
        values.append(data.poids)
    if data.taille is not None:
        fields.append("taille = %s")
        values.append(data.taille)
    if data.etat_sante is not None:
        fields.append("etat_sante = %s")
        values.append(data.etat_sante)
    if data.diagnostic is not None:
        fields.append("diagnostic = %s")
        values.append(data.diagnostic)
    if data.traitement is not None:
        fields.append("traitement = %s")
        values.append(data.traitement)
    if data.description is not None:
        fields.append("description = %s")
        values.append(data.description)
    if data.etat is not None:
        fields.append("etat = %s")
        values.append(data.etat)

    if not fields:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Aucun champ à modifier")

    values.append(id_dossier)
    query = f"UPDATE dossier SET {', '.join(fields)} WHERE id_dossier = %s"
    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Dossier modifié avec succès"}