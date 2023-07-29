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
    
    params = {'query': food_item, 'api_key': api_key}
    url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if "foods" in data and data["foods"]:
            food = data["foods"][0]
            nutrients = food.get("foodNutrients", [])
            nutrition_data = {
                "Food Item": food["description"],
                "Calories": food.get("foodNutrients", {}).get("energyKcal", 0),
                "Protein": next((n["amount"] for n in nutrients if n["nutrientName"] == "Protein"), 0),
                "Carbohydrates": next((n["amount"] for n in nutrients if n["nutrientName"] == "Carbohydrate, by difference"), 0),
                "Fat": next((n["amount"] for n in nutrients if n["nutrientName"] == "Total lipid (fat)"), 0),
                "Fiber": next((n["amount"] for n in nutrients if n["nutrientName"] == "Fiber, total dietary"), 0),
                "Sodium": next((n["amount"] for n in nutrients if n["nutrientName"] == "Sodium, Na"), 0),
            }
            return jsonify(nutrition_data)
        else:
            return jsonify({"error": "Food item not found in the database."}), 404
    else:
        return jsonify({"error": "Unable to retrieve nutrition data. Please try again."}), 400
    
if __name__ == "__main__":
    app.run()
