from flask import current_app as app
from flask import render_template, url_for, send_from_directory


# main route
@app.route('/')
@app.route('/<path>')
def index(path=None):

    return render_template('index.html')
