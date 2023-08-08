from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')
  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8080', debug=True)