#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Patient


# Views go here!

class PatientIndex(Resource):
    def get(self):
        patients_dict = [patient.to_dict() for patient in Patient.query.all()]
        return patients_dict, 200
    
    def post(self):
        data = request.get_json()
        new_patient = Patient(
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            age = data.get("age"),
            gender = data.get("gender")
        )
        db.session.add(new_patient)
        db.session.commit()

        return new_patient.to_dict(), 201 

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

api.add_resource(PatientIndex, '/patients', endpoint='patients')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

