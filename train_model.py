import pandas as pd
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
import joblib
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("ai_literacy_dataset.csv")

# Debug: check columns
print("Columns:", df.columns)

# Target column
target_column = "overall_label"

# Split features and target
X = df.drop(target_column, axis=1)
y = df[target_column]

# Encode categorical data
le_X = LabelEncoder()
for column in X.columns:
    X[column] = le_X.fit_transform(X[column])

le_y = LabelEncoder()
y = le_y.fit_transform(y)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = DecisionTreeClassifier(
    max_depth=4,
    min_samples_split=20,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluation
accuracy = model.score(X_test, y_test)

print("\nAccuracy:", accuracy)
print("\nClassification Report:\n")
print(classification_report(y_test, model.predict(X_test)))

y_pred = model.predict(X_test)

import matplotlib.pyplot as plt
import numpy as np

# Count occurrences
unique_classes = np.unique(y_test)

actual_counts = [list(y_test).count(cls) for cls in unique_classes]
pred_counts = [list(y_pred).count(cls) for cls in unique_classes]

labels = [str(c) for c in le_y.classes_]

x = np.arange(len(labels))

plt.figure(figsize=(8,6))
plt.bar(x - 0.2, actual_counts, width=0.4, label='Actual')
plt.bar(x + 0.2, pred_counts, width=0.4, label='Predicted')

plt.xticks(x, labels)
plt.xlabel("Classes")
plt.ylabel("Count")
plt.title("Actual vs Predicted Class Distribution")
plt.legend()

plt.show()

# Save model
joblib.dump(model, "ai_literacy_model.pkl")
print("\nModel saved as ai_literacy_model.pkl")

# Plot decision tree (FIXED)
plt.figure(figsize=(18,10))
plot_tree(
    model,
    feature_names=X.columns,
    class_names=[str(c) for c in le_y.classes_],  # ✅ FIX HERE
    filled=True
)

plt.title("AI Literacy Decision Tree")
plt.show()