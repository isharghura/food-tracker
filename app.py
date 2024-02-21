from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')
  
if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
