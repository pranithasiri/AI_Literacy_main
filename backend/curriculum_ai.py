import json
import os
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if api_key and api_key != "your_gemini_api_key_here":
    genai.configure(api_key=api_key)


def generate_curriculum(report):
    if not api_key or api_key == "your_gemini_api_key_here":
        return {"error": "API Key Missing. Please add your Gemini API key in .env"}

    prompt = f"""
You are an AI education expert processing a dataset.

Based on this AI literacy report generated from a decision tree analysis, design a targeted curriculum for students.

REPORT:
{report}

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include ```json or ```
- Do NOT include explanations
- Do NOT include extra text

OUTPUT FORMAT:
{{
  "title": "A catchy title for the overall curriculum",
  "modules": [
    {{
      "module_title": "Module Name",
      "duration": "Duration (e.g., 4 hours)",
      "topics": [
        {{
          "topic_name": "Topic Title",
          "description": "Short description",
          "objectives": ["Objective 1", "Objective 2"],
          "activities": ["Activity 1", "Activity 2"],
          "w3schools_link": "https://www.w3schools.com/..."
        }}
      ]
    }}
  ]
}}
"""

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
            )
        )

        raw_text = response.text.strip()

        cleaned = re.sub(r"```json|```", "", raw_text).strip()

        try:
            parsed = json.loads(cleaned)
            return parsed   # ✅ RETURN DICT (IMPORTANT)

        except json.JSONDecodeError:
            print("❌ RAW AI OUTPUT:\n", raw_text)
            return {
                "error": "Invalid JSON from AI",
                "raw_output": raw_text
            }

    except Exception as e:
        return {
            "error": f"Unexpected error: {str(e)}"
        }