from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime, date

from config import db

class Patient(db.Model, SerializerMixin): 

    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    birthday = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, nullable = False)
    gender = db.Column(db.String, nullable = False)
    phone = db.Column(db.String, nullable = False)
    address = db.Column(db.String, nullable = False)

    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.patient',)

    @validates('age')
    def validate_age(self, key, value):
        if 0 <= int(value) <= 110:
            return value
        else:
            raise ValueError("Patient's age is invalid. Please enter an age between 0 and 110 inclusive.")
        
    @validates('birthday')
    def validate_birthday(self, key, value):
        try:
            birthday = datetime.strptime(value, "%Y-%m-%d").date()
        except ValueError:
            raise ValueError("Invalid date format. Please use YYYY-MM-DD format.")
        
        if birthday > date.today():
            raise ValueError("Birthday cannot be a future date.")
        
        if birthday < date(1913, 1, 1):
            raise ValueError("Birthday is too far in the past. Please enter a valid date.")

        return value

    @validates('phone')
    def validate_phone(self, key, value):
        if len(value) == 10 and value.isnumeric():
            return value
        else:
            raise ValueError("Please enter phone number in either 123-456-7890 or 1234567890 format.")

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String, nullable = False)
    hour = db.Column(db.String, nullable = False)
    reason = db.Column(db.String, nullable = False)
    notes = db.Column(db.String)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))

    patient = db.relationship('Patient', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')

    serialize_rules = ('-patient.appointments', '-doctor.appointments')

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

    @validates('npi')
    def validate_npi(self, key, value):
        if isinstance(value, int):
            return value
        else:
            raise ValueError('Invalid NPI, please make sure NPI only consists of 10 numbers.')
        
    @validates('field')
    def validate_field(self, key, value):
        if len(value) == 10 and value.endswith('X'):
            return value
        else:
            raise ValueError('Make sure taxonomy code consists of 10 characters that end with letter "X"')



