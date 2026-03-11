import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load .env from /home/ubuntu/dev/deeptalk/.env
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

if not os.getenv("DEEPTALK_MONGODB_URI"):
    print("FATAL: DEEPTALK_MONGODB_URI not set in environment", file=sys.stderr)
    sys.exit(1)

from routes.api import router

app = FastAPI(title="Deeptalk Dashboard API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
