import json
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

with open('config.json') as config:
    config_data = json.load(config)
    
api_key = config_data["api_key"]