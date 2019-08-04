from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify
import json, os, requests, bs4
import tools

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/calculate')
def calculate():
	return render_template('calculate.html')


# TO DO FOR FINAL PROJECT ( base level, presentable project)
# - millionare after


app.run(debug=True, port=5000)
