# app/main.py
from fastapi import FastAPI
from app.config import setup_logging
import logging

# Configura il logging
setup_logging()
logger = logging.getLogger(__name__)

from app.routers import auth, users  # Importa sia auth che users

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)  

@app.get("/")
async def root():
    logger.info("Chiamata all'endpoint root")
    return {"message": "Hello World"}