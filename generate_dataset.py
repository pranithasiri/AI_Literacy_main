import pandas as pd
import numpy as np

np.random.seed(42)
rows = 2000

data = []

def sub_label(score):
    if score < 2.6:
        return "Low"
    elif score < 3.4:
        return "Medium"
    else:
        return "High"

for _ in range(rows):

    gender = np.random.randint(0, 2)
    field = np.random.choice([0, 1, 2], p=[0.4, 0.5, 0.1])
    uses_ai = np.random.choice([0,1], p=[0.18,0.82])
    frequency = np.random.randint(0,5)
    ai_course = np.random.choice([0,1], p=[0.92,0.08])

    score = 1.5
    score += frequency * 0.4

    if ai_course == 1:
        score += 0.8

    if field == 1:
        score += 0.3
    elif field == 2:
        score += 0.2

    if gender == 1:
        score += 0.1

    score += np.random.normal(0, 0.3)
    score = max(1, min(5, score))

    technical = max(1, min(5, score + np.random.normal(0,0.2)))
    practical = max(1, min(5, score + np.random.normal(0,0.2)))
    critical = max(1, min(5, score + np.random.normal(0,0.2)))

    total = (technical + practical + critical) / 3

    if total < 2.6:
        overall_label = "Beginner"
    elif total < 3.4:
        overall_label = "Moderate"
    else:
        overall_label = "Advanced"

    technical_level = sub_label(technical)
    practical_level = sub_label(practical)
    critical_level = sub_label(critical)

    data.append([
        gender, field, uses_ai, frequency, ai_course,
        technical, practical, critical,
        overall_label, technical_level,
        practical_level, critical_level
    ])

columns = [
    "gender","field","uses_ai","frequency","ai_course",
    "technical","practical","critical",
    "overall_label",
    "technical_level",
    "practical_level",
    "critical_level"
]

df = pd.DataFrame(data, columns=columns)
df.to_csv("ai_literacy_dataset.csv", index=False)

print("Dataset generated with", len(df), "rows")