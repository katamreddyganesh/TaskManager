from fastapi import Depends
from sqlmodel import  Session
from typing import Annotated
from app.database import get_session

sessionDep = Annotated[Session, Depends(get_session)]




