"""
VisionFit TV — FastAPI Server
Amazon Developer "Build, Ship, Shape" 2026 Hackathon (Fire TV Track)
"""

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os

from database import init_db, get_all_sessions, insert_session, get_user_stats, reset_database
from coach_service import coach_service

app = FastAPI(
    title="VisionFit TV API",
    description="Backend microservice for VisionFit TV Fire TV Fitness Companion",
    version="1.0.0"
)

# Enable CORS for local TV and Web App Tester access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {
        "app": "VisionFit TV API",
        "hackathon": "Amazon Developer Build, Ship, Shape 2026 (Fire TV Track)",
        "status": "online",
        "platform": "Fire OS / Web Leanback"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "storage": "sqlite_ready",
        "ai_coach": "sports_science_engine_ready",
        "fire_tv_mode": True
    }

@app.get("/api/sessions")
def list_sessions():
    """Retrieve all completed workout sessions."""
    return get_all_sessions()

@app.post("/api/sessions")
def create_session(session: Dict[str, Any] = Body(...)):
    """Record a completed workout session and update stats."""
    insert_session(session)
    return {"status": "saved", "id": session.get("id")}

@app.get("/api/stats")
def get_stats():
    """Get calculated user streaks, minutes, and category volume."""
    return get_user_stats()

class CoachChatRequest(BaseModel):
    prompt: str
    history: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    stats: Optional[Dict[str, Any]] = Field(default_factory=dict)

@app.post("/api/coach/chat")
def coach_chat(req: CoachChatRequest):
    """Interact with the AI Fitness Coach."""
    result = coach_service.chat(req.prompt, req.history, req.stats)
    return result

@app.post("/api/reset-demo")
def reset_demo():
    """Reset database to initial demo state."""
    reset_database()
    return {"status": "reset_complete"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
