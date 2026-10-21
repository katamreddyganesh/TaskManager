from fastapi import FastAPI
from sqlmodel import create_engine, SQLModel, Session
from contextlib import asynccontextmanager
import os


database_url = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:ganesh@localhost:5432/taskmanager"
)



if database_url:
    engine = create_engine(database_url, echo=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

def get_session():
    with Session(engine) as session:
        yield session


