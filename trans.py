# This is a simple full-stack Flask application that includes both back-end and front-end web components.
# TODO:
#  1. If you are using WSL2 (*not WSL1*), you *must* place this application in 
#     a folder on your Linux filesystem. This will allow our development tools
#     tools to work properly!
# 
# 

from flask import Flask, url_for, render_template, request, jsonify, after_this_request, send_from_directory
import math
import random

# [ TRANSLATION COMPONENT ]
# note: this section is utilizing a third-party library that plugs into Google
# translate, called 'Googletrans'.
# TODO: install the library with 'pip3 install googletrans'
from googletrans import Translator, constants
from pprint import pprint

translator = Translator(service_urls=['translate.googleapis.com'])




# [ APP COMPONENT ]

translations = ["wiojaefjiw","wjieoajewj","aiowjeiowefji"]
combos = {
        "Detect":["English", "German","Spanish"],
        "English":["German","Spanish"],
        "German":["English","Spanish"],
        "Spanish":["German","English"]
}
langs = {
        "Detect":"auto",
        "German":"de",
        "English":"en",
        "Spanish":"es"
}



app = Flask(__name__)


@app.route("/")
def index():
        print("Hello World!")
        url_for('static',filename='style.css')
        url_for('static',filename='main.js')
        return render_template("index.html",name="MDST Official Translator")


@app.route("/translate", methods=['GET'])
def translate():
        @after_this_request
        def add_header(response):
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        
        args = request.args
        # print("input: " + (args))
        print("RECEIVED A REQUEST FOR TRANSLATION...")
        input = args['str']
        from_lang = args['from']
        to_lang = args['to']
        from_code = langs[from_lang]
        to_code = langs[to_lang]
        use_detected = False
        if from_code == 'auto':
                use_detected = True
        
        out_trans = translator.translate(input, dest=to_code, src=from_code)
        print("WE ARE GIVEN THE FOLLOWING INPUT:\n" + input + "\nFROM THIS WE GET THIS OUTPUT:\n" + out_trans.text)
        jsonResp = {
                "output": out_trans.text
                # "confidence": out_trans.confidence
        }


        print(args)
        print(jsonResp)
        return jsonify(jsonResp)

@app.route("/getCombos", methods=['GET'])
def getCombos():
        @after_this_request
        def add_header(response):
                response.headers.add('Access-Control-ALlow-Origin','*')
                return response
        
        print("GETTING TRANSLATION COMBOS...")
        return jsonify(combos)
        

url_for('static',filename='.well-known/acme-challenge/oTmzGQ52oisrtMS52ZMXra2qhrZY2r-yzYzwlykbxDU')
# @app.route("/.well-known/acme-challenge/oTmzGQ52oisrtMS52ZMXra2qhrZY2r-yzYzwlykbxDU")
# def getChallenge(path):
#         return send_from_directory('static',path)