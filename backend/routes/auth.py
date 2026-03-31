from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

class SendOTPRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^\+998\d{9}$")
    is_register: bool = False

class VerifyOTPRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^\+998\d{9}$")
    code: str = Field(..., min_length=6, max_length=6)

@router.post("/send-otp")
async def send_otp(request: SendOTPRequest):
    # Mock check: If user tries to register with an already existing number
    if request.is_register and request.phone_number == "+998901234567":
        raise HTTPException(status_code=400, detail="Bu foydalanuvchi allaqachon mavjud. Iltimos o'z profilingizga kiring.")

    # In a real app, this would integrate with an SMS provider
    # Generating a mock code of '123456' for any requested valid number
    return {
        "message": "OTP sent successfully",
        "phone_number": request.phone_number,
        "mock_code": "123456" # Temporary for MVP testing
    }

@router.post("/verify")
async def verify_otp(request: VerifyOTPRequest):
    # In a real app, verify against stored code in cache/DB
    if request.code == "123456":
        return {
            "message": "OTP verified successfully",
            "token": "mock-jwt-token-for-development"
        }
    
    raise HTTPException(status_code=400, detail="Invalid OTP code")
