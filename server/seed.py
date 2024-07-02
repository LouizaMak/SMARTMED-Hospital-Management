#!/usr/bin/env python3

# Standard library imports
from random import randint, choice
import string

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patient, Doctor, Appointment

def create_patients():
    patients = []
    for _ in range(10):
        p = Patient(
        first_name = fake.first_name_female(),
        last_name = fake.last_name(),
        age = fake.random_int(min = 0, max = 110),
        gender = "F"
        )
        patients.append(p)
    for _ in range(10):
        p = Patient(
        first_name = fake.first_name_male(),
        last_name = fake.last_name(),
        age = fake.random_int(min = 0, max = 110),
        gender = "M"
        )
        patients.append(p)
    return patients

def generate_npi():
    npi_array = ["1"]
    for i in range(1,10):
        npi_array.append(str(randint(0,9)))
    npi = ''.join(npi_array)
    return npi

def generate_taxonomy():
    array = []
    for i in range(1,5):
        array.append(str(randint(1,9)))
    for i in range(1,3):
        array.append(choice(string.ascii_uppercase))
    for i in range(1, 4):
        array.append(str(randint(1,9)))
    array.append("X")
    return ''.join(array)
    
def create_doctors():
    doctors = []
    for _ in range(10):
        d = Doctor(
            npi = generate_npi(),
            first_name = fake.first_name_female(),
            last_name = fake.last_name(),
            gender = "F",
            field = generate_taxonomy()
        )
        doctors.append(d)
    for _ in range(10):
        d = Doctor(
            npi = generate_npi(),
            first_name = fake.first_name_male(),
            last_name = fake.last_name(),
            gender = "M",
            field = generate_taxonomy()
        )
        doctors.append(d)
    return doctors

def create_appointments(patients, doctors):
    appointments = []
    for _ in range(20):
        date_obj = fake.future_date(end_date = '+365d')
        date = date_obj.strftime('%Y-%m-%d')
        a = Appointment(
            date = date,
            hour = fake.random_int(min = 8, max = 17),
            patient_id = choice(patients).id,
            doctor_id = choice(doctors).id
        )
        appointments.append(a)
    return appointments
        
if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Clearing db...")
        Patient.query.delete()
        Doctor.query.delete()
        Appointment.query.delete()

        print("Seeding patients...")
        patients = create_patients()
        db.session.add_all(patients)
        db.session.commit()
    
        print("Seeding doctors...")
        doctors = create_doctors()
        db.session.add_all(doctors)
        db.session.commit()

        print("Seeding appointments...")
        appointments = create_appointments(patients, doctors)
        db.session.add_all(appointments)
        db.session.commit()

        print("Done seeding!")
