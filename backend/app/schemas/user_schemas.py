from sqlmodel import SQLModel


class Register(SQLModel):
    first_name: str
    last_name: str
    email: str
    password: str

class Login(SQLModel):
    email: str
    password: str




