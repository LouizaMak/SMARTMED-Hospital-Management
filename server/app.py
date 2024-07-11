#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Patient, Doctor, Appointment


# Views go here!
class PatientIndex(Resource):
    def get(self):
        patients_dict = [patient.to_dict() for patient in Patient.query.order_by(Patient.last_name).all()]
        return patients_dict, 200
    
    def post(self):
        data = request.get_json()
        new_patient = Patient(
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            birthday = data.get("birthday"),
            age = data.get("age"),
            gender = data.get("gender")
        )
        db.session.add(new_patient)
        db.session.commit()

        return new_patient.to_dict(), 201 
    
class DoctorIndex(Resource):
    def get(self):
        doctors_dict = [doctor.to_dict() for doctor in Doctor.query.order_by(Doctor.last_name).all()]
        return doctors_dict, 200
    
    def post(self):
        data = request.get_json()
        new_doctor = Doctor(
            npi = data.get("npi"),
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            gender = data.get("gender"),
            field = data.get("field")
        )
        db.session.add(new_doctor)
        db.session.commit()

        return new_doctor.to_dict(), 201
    
class AppointmentIndex(Resource):
    def get(self):
        appointments_dict = [appointment.to_dict() for appointment in Appointment.query.order_by(Appointment.date).all()]
        return appointments_dict, 200
    
    def post(self):
        data = request.get_json()
        new_appointment = Appointment(
            date = data.get("date"),
            hour = data.get("hour"),
            patient_id = data.get("patient_id"),
            doctor_id = data.get("doctor_id"),
            reason = data.get("reason")
        )
        db.session.add(new_appointment)
        db.session.commit()

        return new_appointment.to_dict(), 201
    
class AppointmentDetails(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            return appointment.to_dict(), 200
        return {"message": "Appointment not found"}, 404

    def patch(self, id):
        data = request.get_json()
        appointment = Appointment.query.get(id)
        for attr in data:
            setattr(appointment, attr, data[attr])
        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict(), 200

    def delete(self, id):
        appointment = Appointment.query.get(id)
        appointment_dict = appointment.to_dict()
        db.session.delete(appointment)
        db.session.commit()

        return appointment_dict, 200

api.add_resource(PatientIndex, '/patients', endpoint='patients')
api.add_resource(DoctorIndex, '/doctors', endpoint='doctors')
api.add_resource(AppointmentIndex, '/appointments', endpoint='appointments')
api.add_resource(AppointmentDetails, '/appointments/<id>', endpoint='appointment_details' )

if __name__ == '__main__':
    app.run(port=5555, debug=True)

