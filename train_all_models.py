import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv("ai_literacy_dataset.csv")

# Common input features
X = df[[
    "gender",
    "field",
    "uses_ai",
    "frequency",
    "ai_course"
]]

def train_and_save(target_column, model_name):

    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = DecisionTreeClassifier(
        max_depth=4,
        min_samples_split=20,
        random_state=42
    )

    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)

    print(f"\nModel: {model_name}")
    print("Accuracy:", accuracy)
    print(classification_report(y_test, model.predict(X_test)))

    joblib.dump(model, f"{model_name}.pkl")
    print(f"Saved {model_name}.pkl")


# Train 4 models
train_and_save("overall_label", "model_overall")
train_and_save("technical_level", "model_technical")
train_and_save("practical_level", "model_practical")
train_and_save("critical_level", "model_critical")