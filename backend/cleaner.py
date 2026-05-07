# backend/cleaner.py

def clean_input(data):

    gender_map = {
        "Female": 0,
        "Male": 1
    }

    field_map = {
        "Verbal": 0,
        "Numeric": 1
    }

    yes_no_map = {
        "No": 0,
        "Yes": 1
    }

    frequency_map = {
        "Never": 0,
        "Hardly ever": 1,
        "Every two weeks": 2,
        "Once a week": 3,
        "Every day": 4
    }

    return {
        "gender": data["gender"] if isinstance(data["gender"], int) else gender_map[data["gender"]],
        "field": data["field"] if isinstance(data["field"], int) else field_map[data["field"]],
        "uses_ai": data["uses_ai"] if isinstance(data["uses_ai"], int) else yes_no_map[data["uses_ai"]],
        "frequency": data["frequency"] if isinstance(data["frequency"], int) else frequency_map[data["frequency"]],
        "ai_course": data["ai_course"] if isinstance(data["ai_course"], int) else yes_no_map[data["ai_course"]]
    }

    return cleaned
print("Input cleaning function ready to process data.")