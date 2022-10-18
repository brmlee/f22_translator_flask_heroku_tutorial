#
# trans.py
# written by Alex Shandilis
#
# The part of our backend that we care about - serving webpages, taking care of
# functionality like translation, all exists here! Flask kindly takes care of 
# the rest.
# 
# TODO:
#  1. If you are using WSL2 (*not WSL1*), it is highly recommended that you
#     place this project in a location within your Linux installation's actual
#     directory, as this is necessary for the debugger tools to work properly!
#  2. To check to make sure you have Flask installed and set up, try running a
#     development server with the flask command, and these flags: 
#       a. --debug: enable debugging mode so you can make changes in real 
#               time! make sure to follow (1) in order for it to work 
#               properly.
#       b. --app [app_name]: specify the name of the app, "trans", with the app
#               flag.
#       c. run: finally, affix "run" to the end of your command to run the
#               server.
#       the command should look like this:
#       flask --debug --app trans run   
# 
#
#
# final note: All of this code exists exclusively and independently from our JS
# code that lives on the frontend of our website. To call this code and get a
# response, our Javascript

from flask import Flask, url_for, render_template, request, jsonify 
from flask import after_this_request, send_from_directory
import math
import random

# [ TRANSLATION COMPONENT ]
# note: this section is utilizing a third-party library that plugs into Google
# translate, called 'Googletrans'.
# TODO: install the library with 'pip3 install googletrans'
from googletrans import Translator
translator = Translator(service_urls=['translate.googleapis.com'])




# [ APP COMPONENT ]

# the combos object is part of functionality that we have not implemented yet.
# combos = {
#         "Detect":["English", "German","Spanish"],
#         "English":["German","Spanish"],
#         "German":["English","Spanish"],
#         "Spanish":["German","English"]
# }

# the Googletrans library takes language codes, i.e. "de" for "German", as 
# opposed to a full English name. Therefore, the langs object contains 
# conversions between the full word and its corresponding code. In Python, you
# can get a code by using a string index, i.e. langs["Spanish"] returns "es".
langs = {
        "Detect":"auto",
        "German":"de",
        "English":"en",
        "Spanish":"es"
}



app = Flask(__name__)

# we create the router for our index page
@app.route("/")
# the following function generates and sends our webpage to the end user
def index():
        # print statements can be viewable in the debugging output of the server.
        print("Hello World!")
        # we create a url for accessing our style.css and main.js files so they
        # are accessible by our code in index.html. Note that this also exposes
        # those files to the web, meaning users will be able to view and 
        # download them.
        url_for('static',filename='style.css')
        url_for('static',filename='main.js')
       # render_template returns our index.html file that contains our webpage.
        return render_template("index.html",name="MDST Official Translator")

# adds a route to access the translate function.
@app.route("/translate", methods=['GET'])
# [ TRANSLATION COMPONENT PART 2 ]
# TODO:
#       1. we need to replace this code which accesses the Googletrans 
#          library/API with code that accesses our very own translation API.
#       2. we need to add the ability to connect to different langauges/models.
def translate():
        @after_this_request
        def add_header(response):
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        
        args = request.args
        # a status message is printed in the terminal output for helpful debugging
        print("RECEIVED A REQUEST FOR TRANSLATION...")
        input = args['str']
        from_lang = args['from']
        to_lang = args['to']
        from_code = langs[from_lang]
        to_code = langs[to_lang]
        
        out_trans = translator.translate(input, dest=to_code, src=from_code)
        print("WE ARE GIVEN THE FOLLOWING INPUT:\n" + input 
                + "\nFROM THIS WE GET THIS OUTPUT:\n" + out_trans.text)
        jsonResp = {
                "output": out_trans.text,
                "status": 0 # by default we are returning status 0, but our 
                            # code should return an appropriate value based on 
                            # whether or not the translation was successful.
        }


        print(args)
        print(jsonResp)
        return jsonify(jsonResp)

@app.route("/getCombos", methods=['GET'])
def getCombos():
        @after_this_request
        def add_header(response):
                response.headers.add('Access-Control-Allow-Origin','*')
                return response
        
        print("GETTING TRANSLATION COMBOS...")
        return jsonify(combos)