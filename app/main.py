# app/main.py
from fastapi import FastAPI
from app.routers import auth, users  # Importa sia auth che users


app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)  

@app.get("/")
async def root():
    return {"message": "Hello World"}