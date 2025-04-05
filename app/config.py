# app/config.py
import os
import logging.config

print(">>> Caricamento config.py")

# Assicurati che la cartella dei log esista
LOGS_DIR = os.path.join(os.path.dirname(__file__), "..", "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOGS_DIR, "app.log")

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {
            "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
        },
    },
    "handlers": {
        "file_handler": {
            "class": "logging.FileHandler",
            "formatter": "standard",
            "filename": LOG_FILE,
            "level": "INFO",
        },
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
            "level": "DEBUG",
        },
    },
    "root": {
        "handlers": ["file_handler", "console"],
        "level": "DEBUG",
    },
}
    
def setup_logging():
    logging.config.dictConfig(LOGGING_CONFIG)
