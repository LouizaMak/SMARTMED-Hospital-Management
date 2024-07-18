# SMARTMED Hospital Management

SmartMed is a hospital management software designed to maintain patient and doctor records as well as upcoming appointments. New patients and doctors can be added and appointments can be added, updated, and deleted. A notes section is also available under appointment overview.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Where Do I Start?](#wheredoistart?)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)

## Features
- Maintain patiend and doctor records
- Add, delete, and manage upcoming appointments by doctor
- Add visit notes under appointment overview

## Prerequisites
- Node.js
- npm
- Python
- Pipenv

## Installation

1. Clone the repository:
```
$ git clone https://github.com/PartSloth/python-p4-hospital-management-project
$ cd smartmed
```

2. Install the client dependencies:
```
$ npm install --prefix client
```

3. Set up the Python environment and install dependencies:
```
$ pipenv install
```

## Where Do I Start?

In the project directory, run:

```
$ npm start --prefix client
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In a separate terminal, run:

```
$ pipenv shell
$ cd server
$ python seed.py
```

This will seed the data for the backend. After, run:

```
$ python app.py
```

Backend JSON data can be found at:\
[http://127.0.0.1:5555/patients](http://127.0.0.1:5555/patients)\
[http://127.0.0.1:5555/doctors](http://127.0.0.1:5555/doctors)\
[http://127.0.0.1:5555/appointments](http://127.0.0.1:5555/appointments)

Your app is ready to be deployed!
See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Usage
Demo video [here](TBD).

## Roadmap
![Static Badge](https://img.shields.io/badge/07%2F18%2F24-blue)

Future implementations:

- Login feature
- Calendar view of appointments
- Filter doctors based on field
- Add prescription model
- Add drug model
- Doctor's page can pull appointments
- Patient's page can  pull up past and future appointments

## License
[MIT](https://choosealicense.com/licenses/mit/)