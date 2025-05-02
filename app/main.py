# app/main.py
from fastapi import FastAPI
from app.config import setup_logging

setup_logging()
import logging

# Configura il logging
logger = logging.getLogger(__name__)

# Middlewares
from app.middlewares.error_handle import global_error_handler

# Routers
from app.routers import auth, users  # Importa sia auth che users

# Database
from app.db import engine  # engine creato in app/db.py
from app.models.models import Base  # Base con tutti i modelli SQLAlchemy

# Creazione automatica delle tabelle all'avvio (facoltativo per sviluppo)
Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.name = "FastAPI-Padel indoor"
app.description = "API per la gestione di un centro sportivo di Padel indoor"
app.version = "0.1.0"
app.license_info = {
    "name": "MIT License",
    "url": "https://opensource.org/licenses/MIT",
}

# ✅ Registra il middleware
app.middleware("http")(global_error_handler)

app.include_router(auth.router)
app.include_router(users.router)  

@app.get("/", tags=["home"])
async def root():
    logger.info("Chiamata all'endpoint root")
    return {"message": "Hello World"}