"""
Flask-based Chatbot API for MAHA-EV Project
Routes:
  - GET/POST /api/about          → Project overview
  - GET/POST /api/timeline       → 3-year timeline
  - GET/POST /api/current        → Current status
  - GET/POST /api/datasets       → Dataset information
  - POST /api/chat               → Intelligent query handling
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ────── Predefined Content Data ──────────────────────────────────────────────

ABOUT_DATA = {
    "title": "About MAHA-EV Project",
    "focus": "Real-time early-warning system for battery abuse and fire prevention in Indian EVs",
    "challenge": "Indian conditions (high temperature, humidity, variable road loads) stress lithium-ion batteries, potentially triggering thermal runaway",
    "solution": "Predictive diagnostics with IoT sensors for proactive battery safety monitoring",
    "project_name": "MAHA-EV E-RIDES",
    "description": "Smart Battery Safety Diagnostic System using multi-modal sensing to monitor gas emissions, pressure, temperature, and voltage simultaneously, powered by physics-guided machine learning."
}

TIMELINE_DATA = {
    "title": "3-Year Research Timeline",
    "phases": [
        {
            "year": 1,
            "phase": "Phase A",
            "title": "Experimental Foundation",
            "description": "Experimental data collection + Battery Digital Twin development",
            "color": "#1e3a8a",
            "activities": ["Data collection from CALCE, NASA PCoE", "Battery Digital Twin models", "Baseline performance metrics"]
        },
        {
            "year": 2,
            "phase": "Phase B",
            "title": "Sensing & AI Integration",
            "description": "Multimodal IoT sensing suite + AI fault detection integration",
            "color": "#f97316",
            "activities": ["IoT sensor deployment", "Deep learning model training", "Anomaly detection pipeline"]
        },
        {
            "year": 3,
            "phase": "Phase C",
            "title": "System Deployment",
            "description": "Smart battery safety diagnostic system deployment & testing",
            "color": "#059669",
            "activities": ["Real-world system deployment", "Field testing", "Documentation & publication"]
        }
    ]
}

CURRENT_DATA = {
    "title": "Current Research Status",
    "status": "IN DEVELOPMENT",
    "status_color": "#10b981",
    "status_description": "Active research phase - Multiple work streams in progress",
    "focus_areas": [
        "Electrothermal Abuse (ETA) Test Setup",
        "Anomaly Detection Using Deep Learning",
        "Battery Digital Twin Based Adaptive RL"
    ],
    "recent_progress": "Physical test rig development, machine learning model training, and real-time prediction system integration."
}

DATASETS_DATA = {
    "title": "Available Datasets",
    "description": "The MAHA-EV project leverages world-class battery datasets",
    "datasets": [
        {
            "name": "CALCE Dataset",
            "source": "University of Maryland",
            "description": "Comprehensive lithium-ion battery degradation data from controlled experiments"
        },
        {
            "name": "NASA PCoE Battery Dataset",
            "source": "NASA Prognostics Center of Excellence",
            "description": "Real-world battery cyclic aging and thermal behavior data"
        },
        {
            "name": "McMaster University Dataset",
            "source": "McMaster University",
            "description": "Detailed electrochemical impedance spectroscopy and battery monitoring data"
        }
    ]
}

PREDICTOR_DATA = {
    "title": "Battery Health Predictor",
    "description": "Predicts battery health score (0-100) based on voltage, temperature, cycle count, SOC, and C-rate",
    "features": [
        "Overall health grade (A-F)",
        "Capacity retention percentage",
        "Component-wise breakdown",
        "Actionable recommendations"
    ]
}

# ────── Intent Recognition Helper ──────────────────────────────────────────

def detect_intent(query):
    """
    Simple rule-based intent detection.
    Returns: (intent_type, confidence)
    """
    query_lower = query.lower()
    
    about_keywords = ['about', 'project', 'maha', 'mission', 'purpose', 'goal', 'focus', 'what is', 'tell me about']
    timeline_keywords = ['timeline', 'phase', 'year', 'schedule', 'progress', 'when', 'roadmap', 'milestone']
    current_keywords = ['current', 'status', 'progress', 'development', 'what\'s happening', 'working on', 'focus', 'now']
    dataset_keywords = ['dataset', 'data', 'calce', 'nasa', 'mcmaster', 'university', 'training data', 'battery data']
    predictor_keywords = ['predict', 'battery', 'health', 'predictor', 'score', 'grade', 'condition', 'analysis']
    
    intents = {
        'about': about_keywords,
        'timeline': timeline_keywords,
        'current': current_keywords,
        'datasets': dataset_keywords,
        'predictor': predictor_keywords
    }
    
    max_score = 0
    detected_intent = 'help'
    
    for intent, keywords in intents.items():
        score = sum(1 for kw in keywords if kw in query_lower)
        if score > max_score:
            max_score = score
            detected_intent = intent
    
    confidence = min(100, (max_score / 2) * 100) if max_score > 0 else 30
    
    return detected_intent, confidence

# ────── API Endpoints ──────────────────────────────────────────────────────

@app.route('/api/about', methods=['GET', 'POST'])
def get_about():
    """Return project overview information"""
    return jsonify({
        'success': True,
        'data': ABOUT_DATA,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/timeline', methods=['GET', 'POST'])
def get_timeline():
    """Return 3-year research timeline"""
    return jsonify({
        'success': True,
        'data': TIMELINE_DATA,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/current', methods=['GET', 'POST'])
def get_current():
    """Return current research status"""
    return jsonify({
        'success': True,
        'data': CURRENT_DATA,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/datasets', methods=['GET', 'POST'])
def get_datasets():
    """Return dataset information"""
    return jsonify({
        'success': True,
        'data': DATASETS_DATA,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chatbot endpoint - processes user queries
    Expects: { "query": "user message" }
    Returns: { "response": "bot message", "intent": "detected_intent", "data": {...} }
    """
    try:
        payload = request.json or {}
        user_query = payload.get('query', '').strip()
        
        if not user_query:
            return jsonify({
                'success': False,
                'error': 'Empty query',
                'response': 'Please ask me something about the MAHA-EV project!'
            }), 400
        
        # Detect user intent
        intent, confidence = detect_intent(user_query)
        
        # Route to appropriate data source with simple responses and action buttons
        if intent == 'about':
            response_data = ABOUT_DATA
            bot_response = "MAHA-EV is building an early-warning system for battery safety in Indian EVs."
            buttons = [
                {"label": "Learn More", "action": "navigate", "target": "/about"}
            ]
            
        elif intent == 'timeline':
            response_data = TIMELINE_DATA
            bot_response = "Our research is organized into 3 phases over 3 years."
            buttons = [
                {"label": "View Timeline", "action": "navigate", "target": "/deliverables"}
            ]
            
        elif intent == 'current':
            response_data = CURRENT_DATA
            bot_response = "We're actively developing ETA testing, anomaly detection, and battery digital twin models."
            buttons = [
                {"label": "View Progress", "action": "navigate", "target": "/deliverables"}
            ]
            
        elif intent == 'datasets':
            response_data = DATASETS_DATA
            bot_response = "We use CALCE, NASA PCoE, and McMaster University battery datasets."
            buttons = [
                {"label": "View Datasets", "action": "navigate", "target": "/datasets"}
            ]
            
        elif intent == 'predictor':
            response_data = PREDICTOR_DATA
            bot_response = "Check battery health with our predictor tool."
            buttons = [
                {"label": "Go to Predictor", "action": "navigate", "target": "/predictor"}
            ]
            
        else:  # help / generic
            response_data = {
                'topics': ['About Project', 'Timeline', 'Current Status', 'Datasets', 'Battery Predictor']
            }
            bot_response = "I can help with project info, timeline, status, datasets, or battery prediction."
            buttons = [
                {"label": "About", "action": "navigate", "target": "/about"},
                {"label": "Deliverables", "action": "navigate", "target": "/deliverables"},
                {"label": "Datasets", "action": "navigate", "target": "/datasets"}
            ]
        
        return jsonify({
            'success': True,
            'response': bot_response,
            'intent': intent,
            'confidence': confidence,
            'data': response_data,
            'buttons': buttons,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'response': 'Something went wrong. Please try again.'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'MAHA-EV Chatbot API',
        'version': '1.0'
    })

# ────── Main ──────────────────────────────────────────────────────────────

if __name__ == '__main__':
    print("🤖 MAHA-EV Chatbot API running on http://localhost:5000")
    app.run(debug=True, port=5000, host='0.0.0.0')
