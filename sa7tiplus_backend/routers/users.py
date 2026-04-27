from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Gestion Utilisateurs"])

@router.post("/add")
def add_user():
    return {"message": "Utilisateur ajouté"}

@router.put("/archive/{user_id}")
def archive_user(user_id: int):
    return {"message": f"Utilisateur {user_id} archivé"}