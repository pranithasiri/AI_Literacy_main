# AI Literacy Project

A comprehensive AI literacy assessment and learning platform that uses machine learning to predict student AI proficiency levels and generates personalized learning curricula.

## 📋 Project Overview

This project provides an end-to-end solution for assessing and improving AI literacy in students. It combines multiple machine learning models to evaluate different aspects of AI knowledge (technical, practical, and critical thinking) and uses Google's Generative AI to create personalized curriculum recommendations.

### Key Features

- **Multi-Model Prediction System**: Predicts overall, technical, practical, and critical AI literacy levels
- **AI-Powered Curriculum Generation**: Automatically generates personalized learning paths using Google Gemini API
- **Data Analysis Dashboard**: Interactive frontend for data visualization and analysis
- **Database Integration**: MongoDB integration for storing predictions and student data
- **REST API Backend**: FastAPI-based backend for handling predictions and curriculum generation

## 📁 Project Structure

```
AI literacy/
├── backend/                          # FastAPI backend application
│   ├── main.py                      # FastAPI application entry point
│   ├── cleaner.py                   # Data cleaning and preprocessing
│   ├── predictor.py                 # Model prediction logic
│   ├── curriculum_ai.py             # Curriculum generation using Gemini API
│   ├── database.py                  # MongoDB database operations
│   ├── dataset_analyzer.py          # Dataset analysis utilities
│   ├── models_utf8.txt              # Model metadata
│   └── temp_*.csv                   # Temporary dataset files
│
├── frontend/                         # React-based web interface
│   ├── src/
│   │   ├── App.jsx                  # Main React component
│   │   ├── main.jsx                 # React entry point
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Dashboard page
│   │   │   ├── Curriculum.jsx       # Curriculum display page
│   │   │   ├── Analytics.jsx        # Analytics and charts page
│   │   │   └── Upload.jsx           # Data upload page
│   │   ├── App.css                  # Global styles
│   │   ├── index.css                # Index styles
│   │   └── assets/                  # Static assets
│   ├── public/                      # Public static files
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # ESLint configuration
│
├── models/                          # Pre-trained ML models
│   ├── model_overall.pkl            # Overall literacy model
│   ├── model_technical.pkl          # Technical skills model
│   ├── model_practical.pkl          # Practical skills model
│   └── model_critical.pkl           # Critical thinking model
│
├── train_model.py                   # Model training script
├── train_all_models.py              # Batch training for all models
├── test_model.py                    # Model testing and validation
├── generate_dataset.py              # Dataset generation utility
├── ai_literacy_dataset.csv          # Main dataset
└── requirements.txt                 # Python dependencies
```

## 🔧 Technology Stack

### Backend
- **FastAPI**: Modern Python web framework for building APIs
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Machine learning library (Decision Trees)
- **Joblib**: Model serialization
- **Pydantic**: Data validation
- **PyMongo**: MongoDB driver for Python
- **Google Generative AI**: Gemini API for curriculum generation
- **Uvicorn**: ASGI server

### Frontend
- **React 19.2.4**: Modern UI library
- **Vite**: Fast build tool
- **Axios**: HTTP client
- **React Router**: Client-side routing
- **Recharts**: Data visualization
- **React Markdown**: Markdown rendering
- **Lucide React**: Icon library
- **ESLint**: Code quality

### Database
- **MongoDB**: NoSQL database for storing predictions and student data

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 16+ and npm
- MongoDB (local or Atlas cloud)
- Google Gemini API key

### Backend Setup

1. **Create and activate virtual environment** (Windows):
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables** - Create `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=mongodb://localhost:27017/
   DATABASE_NAME=ai_literacy_db
   ```

4. **Start MongoDB**:
   ```bash
   # If MongoDB is installed locally
   mongod
   
   # Or use MongoDB Atlas cloud
   ```

5. **Run the FastAPI server**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install Node dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📊 Model Training

### Train Individual Models

```bash
python train_model.py
```

### Train All Models at Once

```bash
python train_all_models.py
```

### Generate Training Dataset

```bash
python generate_dataset.py
```

### Test Models

```bash
python test_model.py
```

## 🔌 API Endpoints

### POST /predict
Predicts AI literacy levels for a student based on their profile.

**Request Body**:
```json
{
  "gender": "Male",
  "field": "Numeric",
  "uses_ai": "Yes",
  "frequency": "Every day",
  "ai_course": "Yes"
}
```

**Response**:
```json
{
  "message": "Prediction successful",
  "prediction": {
    "overall": "High",
    "technical": "High",
    "practical": "Medium",
    "critical": "High"
  }
}
```

### POST /curriculum
Generates a personalized curriculum based on literacy assessment.

**Request Body**:
```json
{
  "report": "AI literacy assessment report..."
}
```

**Response**:
```json
{
  "curriculum": {
    "modules": [...],
    "learning_path": [...],
    "timeline": "..."
  }
}
```

## 📈 Features

### Dashboard
- Student statistics and analytics
- Prediction history
- Performance metrics
- Interactive charts and visualizations

### Curriculum Page
- Personalized learning recommendations
- Topic-based curriculum structure
- Progress tracking
- Resource suggestions

### Analytics Page
- Dataset insights
- Literacy distribution charts
- Demographic analysis
- Performance trends

### Upload Page
- CSV dataset upload
- Batch prediction processing
- Data import functionality

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```
# Google Gemini API
GEMINI_API_KEY=your_api_key_here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=ai_literacy_db

# FastAPI Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

## 📦 Dependencies

See [requirements.txt](requirements.txt) for complete Python dependencies.

### Key Dependencies:
- fastapi==0.115.0
- pandas==2.2.3
- scikit-learn==1.6.1
- pymongo==4.8.1
- google-generativeai==0.8.6
- python-dotenv==1.2.2
- matplotlib==3.10.0

## 🧪 Testing

### Unit Tests
```bash
pytest tests/
```

### Model Validation
```bash
python test_model.py
```

### API Testing
Use the interactive API docs at `http://localhost:8000/docs`

## 📝 Data Preprocessing

The `cleaner.py` module handles data transformation:

- **Gender**: Female (0), Male (1)
- **Field**: Verbal (0), Numeric (1), Other (2)
- **Uses AI**: No (0), Yes (1)
- **Frequency**: Never (0), Hardly ever (1), Every two weeks (2), Once a week (3), Every day (4)
- **AI Course**: No (0), Yes (1)

## 🤖 Models Used

All models use **Decision Tree Classifier** from scikit-learn:

1. **Overall Literacy Model**: Predicts overall AI literacy level
2. **Technical Model**: Evaluates technical AI knowledge
3. **Practical Model**: Assesses practical application skills
4. **Critical Model**: Measures critical thinking about AI

## 🔄 Data Flow

```
Student Input (Frontend)
    ↓
[Data Validation via Pydantic]
    ↓
[Data Cleaning - Encoding]
    ↓
[ML Models - Prediction]
    ↓
[MongoDB - Store Results]
    ↓
[Gemini API - Generate Curriculum]
    ↓
Display Results (Frontend)
```

## 🚨 Error Handling

- Invalid input validation via Pydantic models
- Database connection error handling
- API key validation for Gemini
- Model loading error handling
- CORS error handling

## 🔗 CORS Configuration

The backend allows all origins in development mode. Update the CORS middleware in `backend/main.py` for production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 📚 Documentation

### API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Data Schema
- Input features defined in `StudentInput` (Pydantic model)
- Output predictions defined in response schemas

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible on `localhost:27017`

### API Not Starting
- Check if port 8000 is available
- Verify all dependencies installed: `pip install -r requirements.txt`
- Check for Python version compatibility (3.11+)

### Frontend Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -r node_modules`
- Reinstall: `npm install`

### Gemini API Errors
- Verify API key in `.env` file
- Check API quota and rate limits
- Ensure internet connection

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributors here]

## 📧 Contact

For questions or support, please contact [your contact information]

## 🔮 Future Enhancements

- [ ] Add user authentication and profiles
- [ ] Implement progress tracking over time
- [ ] Add more AI models (Random Forest, Neural Networks)
- [ ] Create mobile app version
- [ ] Add video-based learning resources
- [ ] Implement adaptive learning paths
- [ ] Add quiz and assessment modules
- [ ] Real-time collaborative features

## 🙏 Acknowledgments

- Google Generative AI for curriculum generation
- Scikit-learn for machine learning models
- FastAPI for the web framework
- React community for frontend tooling
