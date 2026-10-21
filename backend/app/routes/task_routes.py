from fastapi import Depends, HTTPException, APIRouter, Form, status
from sqlmodel import select
from app.dependencies import sessionDep
from app.models.models import UserTable, TodoList
from app.schemas.task_schemas import Tasks
from app.auth import get_current_user
from typing import Annotated

router = APIRouter()

@router.get('/Tasks/all')
def get_all_tasks(user: Annotated[str, Depends(get_current_user)], session: sessionDep):
    task_list = session.exec(select(TodoList).where(TodoList.user_id == user.id)).all()
    if not task_list:
        raise HTTPException(status_code=404, detail="There are no tasks related to this id")
    return {"message":f"Total tasks of user {user.id}", "tasks":task_list}

@router.post('/Tasks', status_code=status.HTTP_201_CREATED)
def todo_list(session: sessionDep, user: Annotated[str, Depends(get_current_user)], task: str = Form(...)):
    if not session.exec(select(UserTable).where(UserTable.id == user.id)).first():
        raise HTTPException(status_code=404, detail="User not found.Please enter valid user id")
    task = TodoList(task=task, user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)
    all_tasks = session.exec(select(TodoList)).all()
    print(all_tasks,"all_tasks")
    return {"message":"data added successfully", "Total_tasks":all_tasks}

@router.patch('/Tasks/update_task/{task_id}', status_code=status.HTTP_200_OK)
def update_task(
        user: Annotated[str, Depends(get_current_user)],
        task_id:int,
        session: sessionDep,
        update: Tasks):

    if not session.exec(select(UserTable).where(UserTable.id == user.id)).first():
        raise HTTPException(status_code=404, detail="User not found.Please enter valid user id")
    task = session.exec(select(TodoList).where(TodoList.id == task_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found for specific task_id .Please enter valid task id")
    if update.task:
        task.task = update.task
    session.add(task)
    session.commit()
    session.refresh(task)
    return task



@router.delete("/Delete_task/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
        user: Annotated[str, Depends(get_current_user)],
        task_id: int,
        session: sessionDep):

    if not session.exec(select(UserTable).where(UserTable.id == user.id)).first():
        raise HTTPException(status_code=404, detail="User not found.Please enter valid user id")
    task = session.exec(select(TodoList).where(TodoList.id == task_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found for specific task_id .Please enter valid task id")
    session.delete(task)
    session.commit()
    task2 = session.exec(select(TodoList)).all()
    return {"message": f"Task {task_id} deleted successfully", "Tasks":task2}




