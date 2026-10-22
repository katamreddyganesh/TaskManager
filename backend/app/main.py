from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import lifespan
from app.routes import user_routes
from app.routes import task_routes


app = FastAPI(lifespan=lifespan)


# adding cors middleware for giving access to frontend
origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://127.0.0.1",
    "https://taskmanager-frontend-3kyb.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

#for jinja2
app.mount("/static", StaticFiles(directory="./app/static"), name="static")

@app.get('/')
def home():
    return {"message":"this is homepage"}

# including user routes and task routes
app.include_router(user_routes.router, tags=["user_routes"])
app.include_router(task_routes.router, tags=["task_routes"])



