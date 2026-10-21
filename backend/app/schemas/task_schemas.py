from sqlmodel import SQLModel
from typing import Optional

class Tasks(SQLModel):
    task: Optional[str] = ""