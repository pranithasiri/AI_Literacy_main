import joblib
import pandas as pd

model = joblib.load("ai_literacy_model.pkl")

sample = pd.DataFrame([{
    "gender": 1,
    "field": 1,
    "uses_ai": 1,
    "frequency": 4,
    "ai_course": 1,
    "technical": 4.0,
    "practical": 4.2,
    "critical": 3.8
}])

prediction = model.predict(sample)

print("Predicted Literacy Level:", prediction[0])