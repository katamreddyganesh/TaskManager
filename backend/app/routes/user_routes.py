from fastapi import HTTPException, APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from sqlmodel import select, Session
from app.dependencies import sessionDep
from app.models.models import UserTable
from app.schemas.user_schemas import Register
from app.auth import hash_password, verify_password, get_current_user, Annotated, create_access_token

router = APIRouter()

templates = Jinja2Templates(directory="./app/templates/")

@router.post('/Register')
def register(data: Register, session: sessionDep):
    if session.exec(select(UserTable).where(UserTable.email==data.email)).first():
        raise HTTPException(status_code=409, detail="This email is already registered. Please log in instead.")
    hashed_password = hash_password(data.password)
    user = UserTable(first_name=data.first_name, last_name=data.last_name, email=data.email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post('/Login')
def login(session: sessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = session.exec(select(UserTable).where(UserTable.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=404, detail="Invalid credentials.!Please enter valid credentials")
    token = create_access_token({"email":user.email})
    return {"user_details": user, "access_token": token, "token_type": "bearer"}


@router.get('/get_all_users')
def get_all_users(session: sessionDep, user: Annotated[Session, Depends(get_current_user)]):
    if user.id == 1:
        users = session.exec(select(UserTable)).all()
        if not users:
            raise HTTPException(status_code=404, detail="No users registered yet.")
        return {"users": users}
    else:
        return {"message":"Only Admin has access"}


@router.get('/profile')
def get_profile(user: Annotated[Session, Depends(get_current_user)]):
    if not user:
        raise HTTPException(status_code=401, detail="user is not logged in")
    return user