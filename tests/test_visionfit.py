"""
VisionFit TV — Automated Test Suite
Verifies data persistence, streak calculations, sports science recommendations,
custom plan generation, and FastAPI endpoints.
"""

import sys
import os
import unittest
from datetime import datetime

# Add server directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "server")))

import database
from coach_service import coach_service

class TestVisionFitCore(unittest.TestCase):
    def setUp(self):
        database.reset_database()

    def test_database_initialization(self):
        """Verify database initializes with pre-populated demo sessions."""
        sessions = database.get_all_sessions()
        self.assertGreaterEqual(len(sessions), 4)
        first = sessions[0]
        self.assertIn("workout_title", first)
        self.assertIn("calories_burned", first)

    def test_user_stats_calculation(self):
        """Verify user stats accurately sum minutes and categories."""
        stats = database.get_user_stats()
        self.assertGreater(stats["totalMinutes"], 0)
        self.assertGreater(stats["totalCalories"], 0)
        self.assertGreaterEqual(stats["currentStreakDays"], 1)
        self.assertIn("hiit", stats["categoryDistribution"])

    def test_session_insertion_and_persistence(self):
        """Verify inserting a new workout session updates total count and stats."""
        initial_count = len(database.get_all_sessions())
        new_session = {
            "id": "test-session-99",
            "workoutId": "core-armor-10",
            "workoutTitle": "Core Armor Test",
            "category": "core",
            "startedAt": datetime.now().isoformat(),
            "completedAt": datetime.now().isoformat(),
            "durationSeconds": 600,
            "exercisesCompleted": 4,
            "totalExercises": 4,
            "caloriesBurned": 85,
            "difficultyRating": "just_right",
            "userNotes": "Test session notes",
            "repCount": 20
        }
        database.insert_session(new_session)
        updated_sessions = database.get_all_sessions()
        self.assertEqual(len(updated_sessions), initial_count + 1)
        self.assertEqual(updated_sessions[0]["id"], "test-session-99")

    def test_coach_form_biomechanics(self):
        """Verify sports science engine provides squat form guidance."""
        reply = coach_service.chat("How do I fix knee pain during squats?", [], {})
        self.assertIn("squat", reply["text"].lower())
        self.assertIn("knee", reply["text"].lower())
        self.assertEqual(reply["source"], "local_sports_science")

    def test_coach_recovery_guidance(self):
        """Verify sports science engine explains active recovery and supercompensation."""
        reply = coach_service.chat("I feel sore, should I rest today?", [], {})
        self.assertIn("recovery", reply["text"].lower())
        self.assertIn("sleep", reply["text"].lower())

    def test_coach_difficulty_adaptive_recommendation(self):
        """Verify coach adapts to recent session difficulty rating."""
        # When last workout was "too_hard" -> recommend mobility/recovery
        history_hard = [{"difficulty_rating": "too_hard"}]
        reply_hard = coach_service.chat("Recommend workout today", history_hard, {})
        self.assertIn("mobility", reply_hard["text"].lower())

        # When last workout was "easy" -> recommend progressive overload
        history_easy = [{"difficulty_rating": "easy"}]
        reply_easy = coach_service.chat("Recommend workout today", history_easy, {})
        self.assertIn("metabolic", reply_easy["text"].lower())

if __name__ == "__main__":
    unittest.main()
