from flask import current_app as app
from flask import render_template, url_for, send_from_directory


# main route
@app.route('/')
@app.route('/<path:path>')
def index(path=None):

    return render_template('index.html')


# favicons route
@app.route('/assets/img/favicons/<path:filename>')
def favicons(filename):

    return send_from_directory(app.static_folder + '/favicons', filename)
