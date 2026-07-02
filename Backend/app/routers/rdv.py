from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import get_db_connection, get_cursor

router = APIRouter(prefix="/rdv", tags=["RDV"])

class RdvCreate(BaseModel):
    id_patient: int
    id_medecin:int
    specialite: str
    date_RDV: str
    heure_RDV: str
    statut: Optional[str] = 'EN attente'


@router.get("/patient/{id_patient}")
def get_rdvs_by_patient(id_patient: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erreur connexion DB")
    cursor = get_cursor(conn)
    cursor.execute("SELECT * FROM RDV WHERE id_patient = %s", (id_patient,))
    rdvs = cursor.fetchall()
    cursor.close()
    conn.close()
    return rdvs


@router.post("")
def creer_rdv(rdv: RdvCreate):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erreur connexion DB")
    cursor = get_cursor(conn)
    cursor.execute("""
        INSERT INTO RDV (id_patient, id_medecin, specialite, date_RDV, heure_RDV, statut)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (rdv.id_patient, rdv.id_medecin, rdv.specialite, rdv.date_RDV, rdv.heure_RDV, rdv.statut))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "RDV créé avec succès"}


@router.get("/medecin/{id_medecin}")
def get_rdvs_by_medecin(id_medecin: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erreur connexion DB")
    cursor = get_cursor(conn)
    cursor.execute("""
        SELECT rdv.id_rdv, rdv.date_RDV,
               TIME_FORMAT(rdv.heure_RDV, '%H:%i') AS heure_RDV,
               rdv.statut,
               u.nom AS patientNom, u.prenom AS patientPrenom
        FROM RDV rdv
        JOIN users u ON rdv.id_patient = u.id_user
        WHERE rdv.id_medecin = %s
    """, (id_medecin,))
    rdvs = cursor.fetchall()
    cursor.close()
    conn.close()
    return rdvs


@router.delete("/{id_rdv}")
def annuler_rdv(id_rdv: int):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("DELETE FROM RDV WHERE id_rdv = %s", (id_rdv,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "RDV supprimé"}

@router.put("/{id_rdv}/statut")
def update_rdv(id_rdv: int, rdv: dict):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("""
        UPDATE RDV SET statut = %s WHERE id_rdv = %s
    """, (rdv.get("statut"), id_rdv))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Statut mis à jour"}

@router.put("/{id_rdv}/patient")
def modifier_rdv(id_rdv: int, rdv: dict):
    conn = get_db_connection()
    cursor = get_cursor(conn)
    cursor.execute("""
        UPDATE RDV SET date_RDV = %s, heure_RDV = %s WHERE id_rdv = %s
    """, (rdv.get("date_RDV"), rdv.get("heure_RDV"), id_rdv))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Date et heure du RDV mises à jour"}