# Flask-React Boilerplate

## What It Is

This repo contains the basic building blocks for a web application using Flask and React. It is pre-configured and it serves a default `homepage` route.

## Core Dependencies

- flask-1.1.1
- react-16.12.0
- react-router-dom-5.1.2
- react-redux-7.1.3
- redux-4.0.4
- axios-0.19.0

## Requirements

You need to have `pip`, `npm`, and `sass` installed to run this application.

## Installation

1. Clone the git repo
```
git clone git@github.com:cosdensolutions/flask-react.git
```

2. Create a python virtual env and install dependencies
```
pip install -r requirements.txt
```

3. Configure Flask environment variables
```
export FLASK_APP=server
export FLASK_ENV=development
```

4. Create and set your config files
```
mkdir /instance
touch config.py
```

5. Run local development server
```
flask run
```

6. Run `react` in watch mode
```
npm start
```

7. Run `sass` in watch mode
```
cd /static/dist/css
sass styles.scss styles.css --watch
```

8. Open `localhost:5000` in your browser and see the app running

## Formatting rules
`.html`, `.js`, `.jsx` use `prettier`.

`.py` use `autopep8`.


