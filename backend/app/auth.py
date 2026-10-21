from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.dependencies import sessionDep
from sqlmodel import select
from app.models.models import UserTable
from datetime import datetime, timedelta, timezone
from typing import Annotated
import bcrypt, jwt

auth_schema = OAuth2PasswordBearer(tokenUrl="Login")

secret_key = "mysecretkey"
algorithm = 'HS256'
expiry_time = 15

def create_access_token(data: dict, expiry_time: int = expiry_time):
    expiry_duration = datetime.now(timezone.utc) + timedelta(minutes=expiry_time)
    data['exp'] = expiry_duration
    return jwt.encode(data, key=secret_key, algorithm=algorithm)

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except Exception as e:
        print(f"the error from jwt {e}")

def get_current_user(token: Annotated[str, Depends(auth_schema)], session: sessionDep):
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Not Authenticated")
    user = session.exec(select(UserTable).where(UserTable.email==payload["email"])).first()
    return user

def authenticate_user(token: Annotated[str, Depends(auth_schema)]):
    pass

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed_password: str):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
