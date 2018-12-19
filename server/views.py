from flask import current_app as app
from flask import render_template, url_for


# favicon
@app.route('/favicon.ico')
def favicon():
    return url_for('static', filename='/images/favicon.jpg')


# main route
@app.route('/')
def index():

    return render_template('index.html')