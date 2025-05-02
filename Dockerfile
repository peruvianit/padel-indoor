# Usa un'immagine leggera con Python 3.11
FROM python:3.11-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia requirements e installa dipendenze
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia il resto del codice
COPY . .

# Esponi la porta su cui gira FastAPI
EXPOSE 8000

# Comando per avviare l'app (modifica se usi altri nomi)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]