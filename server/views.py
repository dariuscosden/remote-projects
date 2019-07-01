from flask import current_app as app
from flask import render_template, url_for, send_from_directory


# main route
@app.route('/')
def index():

    return render_template('index.html')
