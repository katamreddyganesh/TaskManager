from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class UserTable(SQLModel, table=True):
    __table_args__ = {"extend_existing": True}
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: Optional[str] = Field(unique=True, index=True)
    hashed_password: str
    tasks: List["TodoList"] = Relationship(back_populates="owner")

class TodoList(SQLModel, table=True):
    __table_args__ = {"extend_existing": True}
    id: Optional[int] = Field(default=None, primary_key=True)
    task: str
    user_id: int = Field(foreign_key="usertable.id")
    owner: UserTable = Relationship(back_populates="tasks")





