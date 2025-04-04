from fastapi import APIRouter, HTTPException, Depends, status
from app.services.auth import get_current_user

router = APIRouter()

@router.get("/protected")
def read_protected(current_user: str = Depends(get_current_user)):
    return {"message": f"Ciao {current_user}, hai accesso a questa risorsa protetta!"}
