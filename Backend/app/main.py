from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users,dossiers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(dossiers.router)
@app.get("/")
def root():
    return {"message": "Serveur Sa7tiPlus prêt !"}