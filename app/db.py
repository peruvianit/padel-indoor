# app/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.configuration.settings import settings
import logging


logger = logging.getLogger(__name__)

# Connessione al DB
engine = create_engine(
    settings.DB_URL,
    echo=settings.DEBUG,  # True solo se DEBUG
    pool_size=20,           # Numero max connessioni persistenti
    max_overflow=10,        # Numero max connessioni extra temporanee
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

logger.info("Database engine created successfully.")
