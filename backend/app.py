from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/run-script', methods=['GET'])
def run_script():
    # Get the section_id from the query parameter
    section_id = request.args.get('section_id')
    if not section_id:
        return jsonify({'error': 'section_id is required'}), 400

    try:
        # Execute the Python script and pass the section_id as an argument
        result = subprocess.run(
            ['python', 'carryback_lr_model.py', section_id],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode != 0:
            return jsonify({'error': 'Script execution failed', 'details': result.stderr}), 500

        return jsonify({'message': 'Script executed successfully', 'output': result.stdout}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to execute script', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
