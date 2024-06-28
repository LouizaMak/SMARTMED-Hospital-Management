#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patient

def create_patients():
    patients = []
    for _ in range(20):
        p = Patient(
        first_name = fake.first_name(),
        last_name = fake.last_name(),
        age = fake.random_int(min = 0, max = 110),
        gender = fake.random_element(elements=('F', 'M'))
        )
        patients.append(p)
    return patients

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Clearing db...")
        Patient.query.delete()

        print("Seeding patients...")
        patients = create_patients()
        db.session.add_all(patients)
        db.session.commit()

        print("Done seeding!")
