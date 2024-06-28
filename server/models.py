from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, nullable = False)
    gender = db.Column(db.String, nullable = False)