# backend/database.py

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ai_literacy_db"]
collection = db["students"]


def save_to_db(raw_data, cleaned_data, prediction):

    document = {
        "raw_data": raw_data,
        "cleaned_data": cleaned_data,
        "prediction": prediction
    }

    collection.insert_one(document)
print("Successfully connected to MongoDB and ready to save data.")