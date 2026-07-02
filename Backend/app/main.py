from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, dossiers, rdv, medecin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(dossiers.router)
app.include_router(rdv.router)
app.include_router(medecin.router)

@app.get("/")
def root():
    return {"message": "Serveur Sa7tiPlus prêt !"}