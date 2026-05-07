# backend/main.py
from fastapi import UploadFile, File
from dataset_analyzer import analyze_dataset
import shutil
from curriculum_ai import generate_curriculum
from fastapi import FastAPI
from pydantic import BaseModel
from cleaner import clean_input
from predictor import predict_all
from database import save_to_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudentInput(BaseModel):
    gender: str
    field: str
    uses_ai: str
    frequency: str
    ai_course: str


@app.post("/predict")
def predict_student(data: StudentInput):

    raw_data = data.dict()

    # Clean data
    cleaned_data = clean_input(raw_data)

    # Predict
    prediction = predict_all(cleaned_data)

    # Save to database
    save_to_db(raw_data, cleaned_data, prediction)

    return {
        "message": "Prediction successful",
        "prediction": prediction
    }

@app.post("/analyze_dataset")
def analyze_dataset_api(file: UploadFile = File(...)):

    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_dataset(file_location)

    return {
        "message": "Dataset analyzed successfully",
        "results": result
    }

from fastapi import Body

@app.post("/generate_curriculum")
def generate_curriculum_api(report: dict = Body(...)):

    curriculum = generate_curriculum(report)

    return {
        "ai_generated_curriculum": curriculum
    }
print("API endpoints for prediction, dataset analysis, and curriculum generation are ready.")
