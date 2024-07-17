#!/usr/bin/env python3

# Standard library imports
from random import randint, choice
import string

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patient, Doctor, Appointment

def birthday_calculator(age):
    string = [str(2024 - age), str(randint(1,6)).rjust(2, '0'), str(randint(1,30)).rjust(2, '0')]
    return '-'.join(string)

def generate_address():
    string = f"{fake.street_address()} {fake.city()}, {fake.state_abbr()} {fake.zipcode()}"
    return string

def generate_number():
    area_code = randint(100, 999)
    central_office_code = randint(100, 999)
    line_number = randint(1000, 9999)
    
    phone_number = f"{area_code}-{central_office_code}-{line_number}"
    return phone_number

def create_patients():
    patients = []
    for _ in range(10):
        age_random = fake.random_int(min = 0, max = 110)
        p = Patient(
        first_name = fake.first_name_female(),
        last_name = fake.last_name(),
        age = age_random,
        birthday = birthday_calculator(age_random),
        gender = "F",
        phone = generate_number(),
        address = generate_address()
        )
        patients.append(p)
    for _ in range(10):
        age_random = fake.random_int(min = 0, max = 110)
        p = Patient(
        first_name = fake.first_name_male(),
        last_name = fake.last_name(),
        age = age_random,
        birthday = birthday_calculator(age_random),
        gender = "M",
        phone = generate_number(),
        address = generate_address()
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
    for _ in range(5):
        d = Doctor(
            npi = generate_npi(),
            first_name = fake.first_name_female(),
            last_name = fake.last_name(),
            gender = "F",
            field = generate_taxonomy()
        )
        doctors.append(d)
    for _ in range(5):
        d = Doctor(
            npi = generate_npi(),
            first_name = fake.first_name_male(),
            last_name = fake.last_name(),
            gender = "M",
            field = generate_taxonomy()
        )
        doctors.append(d)
    return doctors

def reason_generator(num):
    reasons = ["Annual checkup", "Sick visit", "Woman's wellness exam", "Scheduled surgery", 
               "Ultrasound", "Follow-up appointment", "Mental health concerns", "Joint paint",
               "Skin issues", "Cholesterol concerns"]
    return reasons[num]

def hour_generator():
    hour = str(fake.random_int(min = 8, max = 17))
    minutes = fake.random_element([":00", ":30"])
    return hour + minutes

def create_appointments(patients, doctors):
    appointments = []
    for _ in range(20):
        date_obj = fake.future_date(end_date = '+365d')
        date = date_obj.strftime('%Y-%m-%d')
        a = Appointment(
            date = date,
            hour = hour_generator(),
            reason = reason_generator(randint(0,9)),
            notes = fake.text(),
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
