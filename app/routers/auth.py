from fastapi import APIRouter, HTTPException, Depends, status, Request, Response, Form
from datetime import timedelta
from app.services import auth
from pydantic import BaseModel
from app.configuration.settings import settings
from app.schemas.TokenRequest import TokenRequest  # ✅ Import del nuovo schema

import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Schema per restituire il token
class TokenResponse(BaseModel):
    access_token: str
    token_type: str

@router.post("/token", tags=["auth"] , response_model=TokenResponse)
def login_for_access_token(data: TokenRequest, response: Response):
    username = data.username
    password = data.password

    logger.info(f"Richiesta di accesso per l'utente: {username}")
    # In un caso reale, dovresti verificare le credenziali dell'utente
    if username != "pippo.rossi_21" or password != "@aP9Lm$z2#rW":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username o password errati",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # Creiamo il token, includendo "sub" (subject) con il nome utente
    access_token = auth.create_access_token(
        data={"sub": username},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    # 🔐 Imposta il cookie HttpOnly
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Attivalo solo in produzione con HTTPS
        samesite="Strict",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/debug-cookie")
def debug_cookie(request: Request):
    print("🍪 Ricevuti cookie:", request.cookies)
    return {"cookies": request.cookies.get("access_token")}    
