import json
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

with open('config.json') as config:
    config_data = json.load(config)
    
api_key = config_data["api_key"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_nutrition', methods=['POST'])
def get_nutrition():
    food_item = request.form['food_item']
    
    params = {'ingr': food_item, 'app_key': api_key}
    url = "https://api.edamam.com/api/nutrition-data"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        nutrition_data = {
            "Food Item": data["text"],
            "Calories": data["calories"],
            "Protein": data["totalNutrients"]["PROCNT"]["quantity"],
            "Carbohydrates": data["totalNutrients"]["CHOCDF"]["quantity"],
            "Fat": data["totalNutrients"]["FAT"]["quantity"],
            "Fiber": data["totalNutrients"]["FIBTG"]["quantity"],
            "Sodium": data["totalNutrients"]["NA"]["quantity"],
        }
        return jsonify(nutrition_data)
    else:
        return jsonify({"Error: " "Error"}), 400
    
    
if __name__ == "__main__":
    app.run()