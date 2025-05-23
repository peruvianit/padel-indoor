from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import Request, Depends, HTTPException, status
from fastapi.security import HTTPBearer, OAuth2PasswordBearer, HTTPAuthorizationCredentials
from app.configuration.settings import settings

bearer_scheme = HTTPBearer(auto_error=False)  # ✅ non lancia errore se manca

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Crea un token JWT includendo la data di scadenza.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Scadenza predefinita: 30 minuti
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    """
    Verifica e decodifica il token JWT.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenziali non valide",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return username
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token non valido o scaduto",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(request: Request, credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    token_cookie = request.cookies.get("access_token")
    token_header = credentials.credentials if credentials else None

    print("🍪 Cookie:", token_cookie)
    print("🔐 Header:", token_header)

    token = token_cookie or token_header

    return verify_token(token)


#def get_current_user(token: str = Depends(oauth2_scheme)):
#    """
#    Dependency per ottenere l'utente corrente a partire dal token.
#    """
#    return verify_token(token)
