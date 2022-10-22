# f22_translator_flask_heroku_tutorial
Flask app deployed on Heroku with some documentation


First, visit this link to try out the app! 
https://f22-translator.herokuapp.com/

Once you've done that, take a look at the structure of this project!
The file structure should look something similar to this:

.<br/>
├── Procfile<br/>
├── README.md<br/>
├── requirements.txt<br/>
├── static<br/>
│   ├── main.js<br/>
│   └── style.css<br/>
├── templates<br/>
│   └── index.html<br/>
└── trans.py<br/>


First, note the Procfile: this is used by Heroku to automatically build our website once it is deployed from Github to their platform. Please don't touch it! It's perfectly fine the way it is.

I would recommended that you try to build the site yourself from scratch, only using this project as a template! Therefore, if you wish to try building a similar project yourself, I would recommend checking out these resources:
- flask.palletsprojects.com/en/2.2.x/quickstart/#a-minimal-application
- w3schools.com/html
- w3schools.com/js
- stackoverflow.com

This is also still a bit of a work-in-progress, so I might add to the code and make some changes where needed!

---

### TODO
- [ ] Develop a machine learning model to demonstrate language translation capabilities of NLP.
- [ ] Train that model on a number of language combinatinos
- [ ] Export that model and prepare it to be deployed for an application.
- [ ] Design a user interface
- [ ] Develop the webapp front-end functionality and experience using JS and HTML/CSS.
- [ ] Build and debug a backend on Flask.
- [ ] Implement and deploy the model on the back-end.
- [ ] Host and publish your final app on Heroku!
