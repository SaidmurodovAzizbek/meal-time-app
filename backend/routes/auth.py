from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

class AuthRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^\+998\d{9}$")

@router.post("/register")
async def register(request: AuthRequest):
    if request.phone_number == "+998901234567":
        raise HTTPException(status_code=400, detail="Bu foydalanuvchi allaqachon mavjud. Iltimos o'z profilingizga kiring.")
    
    return {
        "message": "Muvaffaqiyatli ro'yxatdan o'tdingiz",
        "token": "mock-jwt-token-for-development"
    }

@router.post("/login")
async def login(request: AuthRequest):
    return {
        "message": "Muvaffaqiyatli kirdingiz",
        "token": "mock-jwt-token-for-development"
    }
