from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify
import json, os
import tools

port = int(os.environ.get('PORT', 5000))


app = Flask(__name__)

@app.route('/')
def index():
	return render_template('calculate.html')




app.run(host='0.0.0.0', port=port, debug=True)