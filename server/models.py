from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    birthday = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, nullable = False)
    gender = db.Column(db.String, nullable = False)

    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.patient',)

    @validates('age')
    def validate_age(self, key, value):
        if 0 <= value <= 110:
            return value
        else:
            raise ValueError("Patient's age is invalid. Please enter an age between 0 and 110 inclusive.")
    
    @validates('gender')
    def validate_gender(self, key, value):
        if value == "F" or value == "M":
            return value
        else:
            raise ValueError("Please enter either F or M for the patient's biological gender.")

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String, nullable = False)
    hour = db.Column(db.Integer, nullable = False)
    reason = db.Column(db.String, nullable = False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))

    patient = db.relationship('Patient', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')

    serialize_rules = ('-patient.appointments', '-doctor.appointments')

    @validates('hour')
    def validate_age(self, key, value):
        if 8 <= int(value) <= 17:
            return value
        else:
            raise ValueError("Patient's age is invalid. Please enter an age between 0 and 110 inclusive.")
        
    @validates('date')
    def validate_date(self, key, value):
        array = value.split("-")
        if int(array[0]) >= 2024 and 1 <= int(array[1]) <= 12 and 1 <= int(array[2]) <= 31:
            return value
        else:
            raise ValueError("Date is invalid. Please check that month, day, and year is after today's date.")

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key = True)
    npi = db.Column(db.Integer, nullable = False)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    gender = db.Column(db.String, nullable = False)
    field = db.Column(db.String, nullable = False)

    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.doctor',)


