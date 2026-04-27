from fastapi import FastAPI
from routers import auth  # Python va chercher dans le dossier routers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS pour Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# On inclut les routes de auth.py
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Serveur Sa7tiPlus prêt !"}