from fastapi import FastAPI

app = FastAPI()

# Import routes or other logic
from .routes import router

app.include_router(router)