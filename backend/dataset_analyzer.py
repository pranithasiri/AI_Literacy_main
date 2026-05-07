import pandas as pd
from cleaner import clean_input
from predictor import predict_all_models
from predictor import overall_model, technical_model, practical_model, critical_model

def analyze_dataset(file_path):

    df = pd.read_csv(file_path)

    overall_preds = []
    technical_preds = []
    practical_preds = []
    critical_preds = []

    for _, row in df.iterrows():

        raw_data = {
            "gender": row["gender"],
            "field": row["field"],
            "uses_ai": row["uses_ai"],
            "frequency": row["frequency"],
            "ai_course": row["ai_course"]
        }

        cleaned = clean_input(raw_data)

        prediction = predict_all_models(cleaned)

        overall_preds.append(prediction["overall"])
        technical_preds.append(prediction["technical"])
        practical_preds.append(prediction["practical"])
        critical_preds.append(prediction["critical"])

    total = len(df)

    # -------- Percentage distributions --------

    overall_stats = {
        "Advanced": overall_preds.count("Advanced") / total * 100,
        "Moderate": overall_preds.count("Moderate") / total * 100,
        "Beginner": overall_preds.count("Beginner") / total * 100
    }

    technical_stats = {
        "High": technical_preds.count("High") / total * 100,
        "Medium": technical_preds.count("Medium") / total * 100,
        "Low": technical_preds.count("Low") / total * 100
    }

    practical_stats = {
        "High": practical_preds.count("High") / total * 100,
        "Medium": practical_preds.count("Medium") / total * 100,
        "Low": practical_preds.count("Low") / total * 100
    }

    critical_stats = {
        "High": critical_preds.count("High") / total * 100,
        "Medium": critical_preds.count("Medium") / total * 100,
        "Low": critical_preds.count("Low") / total * 100
    }

    # -------- Feature Importance --------

    features = ["gender", "field", "uses_ai", "frequency", "ai_course"]

    def get_importance(model):
        importance = dict(zip(features, model.feature_importances_))
        sorted_imp = sorted(importance.items(), key=lambda x: x[1], reverse=True)
        return {
            "most_influential": sorted_imp[0],
            "least_influential": sorted_imp[-1]
        }

    influence_report = {
        "overall_model": get_importance(overall_model),
        "technical_model": get_importance(technical_model),
        "practical_model": get_importance(practical_model),
        "critical_model": get_importance(critical_model)
    }

    report = {
        "students_analyzed": total,

        "literacy_distribution_percent": overall_stats,

        "technical_understanding_percent": technical_stats,
        "practical_application_percent": practical_stats,
        "critical_appraisal_percent": critical_stats,

        "decision_tree_influence": influence_report
    }

    return report

print("Dataset analysis complete. Report generated.")