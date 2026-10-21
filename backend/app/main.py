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
    "http://localhost:3000",      # Add this if using standard React/Next.js
    "http://localhost:5173",      # Add this if using Vite
    "http://localhost",      # Add this if using Vite
    "http://localhost:8080",      # Add this if using Vue/Angular
    "http://127.0.0.1:8000",      # Your backend itself (fine to keep)
    "http://127.0.0.1",      # Your backend itself (fine to keep)
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

@app.get('/',response_class=HTMLResponse)
def home():
    with open("./app/templates/example.html","r") as file:
        return file.read()

# including user routes and task routes
app.include_router(user_routes.router, tags=["user_routes"])
app.include_router(task_routes.router, tags=["task_routes"])



