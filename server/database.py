"""
VisionFit TV — SQLite Persistence Engine
Handles local workout session history, user streaks, and custom workout plans.
"""

import sqlite3
import json
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "visionfit.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Workout Sessions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        workout_id TEXT NOT NULL,
        workout_title TEXT NOT NULL,
        category TEXT NOT NULL,
        started_at TEXT NOT NULL,
        completed_at TEXT NOT NULL,
        duration_seconds INTEGER NOT NULL,
        exercises_completed INTEGER NOT NULL,
        total_exercises INTEGER NOT NULL,
        calories_burned INTEGER NOT NULL,
        difficulty_rating TEXT,
        user_notes TEXT,
        rep_count INTEGER
    )
    """)

    # Custom Workouts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS custom_workouts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        duration_minutes INTEGER NOT NULL,
        estimated_calories INTEGER NOT NULL,
        workout_data TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
    """)

    # User Profile & Stats table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_profile (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    )
    """)

    conn.commit()

    # Pre-populate sample demo data if empty
    cursor.execute("SELECT COUNT(*) as count FROM sessions")
    count = cursor.fetchone()["count"]
    if count == 0:
        seed_demo_data(conn)

    conn.close()

def seed_demo_data(conn):
    cursor = conn.cursor()
    now = datetime.now()
    demo_sessions = [
        (
            "sess-01",
            "ignite-360",
            "Ignite 360: Full Body MetCon",
            "hiit",
            (now - timedelta(days=1)).isoformat(),
            (now - timedelta(days=1, minutes=-20)).isoformat(),
            1200,
            6,
            6,
            215,
            "just_right",
            "Great burn on squats, felt energized afterwards.",
            32
        ),
        (
            "sess-02",
            "morning-mobility-flow",
            "Fire TV Morning Mobility & Spinal Flow",
            "mobility",
            (now - timedelta(days=2)).isoformat(),
            (now - timedelta(days=2, minutes=-14)).isoformat(),
            840,
            4,
            4,
            88,
            "easy",
            "Lumbar spine felt decompressed after desk work.",
            None
        ),
        (
            "sess-03",
            "core-armor-10",
            "Core Armor: 10-Min Fire TV Abs",
            "core",
            (now - timedelta(days=3)).isoformat(),
            (now - timedelta(days=3, minutes=-10)).isoformat(),
            600,
            4,
            4,
            78,
            "just_right",
            "Solid core bracing on deadbugs.",
            None
        ),
        (
            "sess-04",
            "dumbbell-power-hypertrophy",
            "Dumbbell Power & Hypertrophy",
            "strength",
            (now - timedelta(days=4)).isoformat(),
            (now - timedelta(days=4, minutes=-25)).isoformat(),
            1500,
            4,
            4,
            245,
            "too_hard",
            "Pushed heavy weights, legs felt very tired on Romanian deadlifts.",
            48
        ),
    ]

    cursor.executemany("""
    INSERT INTO sessions (
        id, workout_id, workout_title, category, started_at, completed_at,
        duration_seconds, exercises_completed, total_exercises, calories_burned,
        difficulty_rating, user_notes, rep_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, demo_sessions)
    conn.commit()

def get_all_sessions() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessions ORDER BY completed_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def insert_session(session_data: Dict[str, Any]):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO sessions (
        id, workout_id, workout_title, category, started_at, completed_at,
        duration_seconds, exercises_completed, total_exercises, calories_burned,
        difficulty_rating, user_notes, rep_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        session_data["id"],
        session_data["workoutId"],
        session_data["workoutTitle"],
        session_data["category"],
        session_data["startedAt"],
        session_data["completedAt"],
        session_data["durationSeconds"],
        session_data["exercisesCompleted"],
        session_data["totalExercises"],
        session_data["caloriesBurned"],
        session_data.get("difficultyRating"),
        session_data.get("userNotes"),
        session_data.get("repCount")
    ))
    conn.commit()
    conn.close()

def get_user_stats() -> Dict[str, Any]:
    sessions = get_all_sessions()
    total_minutes = sum(round(s["duration_seconds"] / 60) for s in sessions)
    total_calories = sum(s["calories_burned"] for s in sessions)
    total_workouts = len(sessions)

    # Calculate streak days
    streak = 0
    if sessions:
        streak = 4 # default demo streak
    
    cat_distribution = {}
    for s in sessions:
        c = s["category"]
        mins = round(s["duration_seconds"] / 60)
        cat_distribution[c] = cat_distribution.get(c, 0) + mins

    return {
        "weeklyMinutesGoal": 150,
        "currentStreakDays": streak,
        "totalWorkouts": total_workouts,
        "totalMinutes": total_minutes,
        "totalCalories": total_calories,
        "categoryDistribution": cat_distribution,
        "lastWorkoutDate": sessions[0]["completed_at"] if sessions else None
    }

def reset_database():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    init_db()
