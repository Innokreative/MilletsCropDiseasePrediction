import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from tensorflow.keras.models import load_model
from PIL import Image
import io

# Load environment variables
load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration
class_names = ['blast', 'downy', 'healthy', 'rust']

# Disease descriptions
disease_descriptions = {
    'blast': 'Blast is a fungal disease causing spindle-shaped spots on leaves. It can severely reduce millet yield if untreated.',
    'downy': 'Downy mildew causes yellowing and white fungal growth on leaves. It thrives in cool, humid conditions.',
    'healthy': 'Your millet crop shows no signs of disease. Maintain good farming practices to keep it healthy.',
    'rust': 'Rust appears as orange-brown pustules on leaves and stems. It weakens plants and reduces grain quality.'
}

# Load ML model
try:
    model = load_model('trained_model/millet_disease_model.keras')
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

@app.route('/predict', methods=['POST'])
def predict():
    """Image classification endpoint"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Process image
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        processed_image = np.expand_dims(image_array, axis=0)

        # Make prediction
        prediction = model.predict(processed_image)
        class_index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))

        # Get disease info
        disease_id = class_names[class_index]
        disease_name = disease_id.upper()

        return jsonify({
            'disease': {
                'id': disease_id,
                'name': disease_name,
                'confidence': round(confidence, 4),
                'description': disease_descriptions[disease_id]
            },
            'processing_time': prediction[0].tolist()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)