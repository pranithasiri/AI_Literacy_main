# backend/predictor.py

import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")

model_overall = joblib.load(os.path.join(MODELS_DIR, "model_overall.pkl"))
model_technical = joblib.load(os.path.join(MODELS_DIR, "model_technical.pkl"))
model_practical = joblib.load(os.path.join(MODELS_DIR, "model_practical.pkl"))
model_critical = joblib.load(os.path.join(MODELS_DIR, "model_critical.pkl"))


# Load models
overall_model = joblib.load("../models/model_overall.pkl")
technical_model = joblib.load("../models/model_technical.pkl")
practical_model = joblib.load("../models/model_practical.pkl")
critical_model = joblib.load("../models/model_critical.pkl")

def predict_all(cleaned_data):

    sample = pd.DataFrame([cleaned_data])

    overall = model_overall.predict(sample)[0]
    technical = model_technical.predict(sample)[0]
    practical = model_practical.predict(sample)[0]
    critical = model_critical.predict(sample)[0]

    return {
        "overall": overall,
        "technical": technical,
        "practical": practical,
        "critical": critical
    }

def predict_all_models(cleaned_data):

    features = [[
        cleaned_data["gender"],
        cleaned_data["field"],
        cleaned_data["uses_ai"],
        cleaned_data["frequency"],
        cleaned_data["ai_course"]
    ]]

    overall = overall_model.predict(features)[0]
    technical = technical_model.predict(features)[0]
    practical = practical_model.predict(features)[0]
    critical = critical_model.predict(features)[0]

    return {
        "overall": overall,
        "technical": technical,
        "practical": practical,
        "critical": critical
    }
print("Predictor functions ready to generate predictions from cleaned data.")