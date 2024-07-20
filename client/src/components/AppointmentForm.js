import { useFormik } from "formik";
import React, { useState } from "react";
import Calendar from "./Calendar";
import dayjs from 'dayjs';
import { appointmentSchema } from "../schemas/schemas";
import './pageStyle.css';

const AppointmentForm = ({onToggleForm, appointments, setAppointments, doctors, patients}) => {
    const [dateObj, setDateObj] = useState(dayjs(new Date()))
    //Available doctors per appointment date and time
    const [availableDoctors, setAvailableDoctors] = useState(doctors)

    //Passed to Calendar component
    function handleDateChange(dateObj) {
        const newDate = dateObj.toISOString().slice(0,10)
        const newHour = `${dateObj.$H}:${dateObj.$m.toString().padStart(2, '0')}`
        setDateObj(dateObj)
        values.date = newDate
        values.hour = newHour
        checkDoctors(newDate, newHour)
    }

    function checkDoctors(date, hour) {
        const filteredDoctors = doctors.filter(doctor => {
            return doctor.appointments.every(appointment => 
                appointment.date !== date || appointment.hour !== hour
            )})
        setAvailableDoctors(filteredDoctors)
    }

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            date: "",
            hour: "",
            reason: "",
            notes: "",
            patient_id: "",
            doctor_id: "",
        },
        validationSchema: appointmentSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/appointments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => res.json())
            .then(newAppointment => {
                    setAppointments([...appointments, newAppointment])
                    onToggleForm()}
            )
        }
    })

    return(
        <div className="form-popup" id="appointmentForm">
            <h2>Schedule Appointment Form</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Date & Time:</label>
                    <Calendar dateObj={dateObj} onDateChange={handleDateChange}/>
                </div>
            
                <div className="field">
                    <label>Doctor:</label>
                    <select name="doctor_id" placeholder="doctors" defaultValue={""} value={values.doctor_id} onChange={handleChange} required>
                        <option value="" disabled>Select Doctor</option>
                        {availableDoctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                    </select>
                    {touched.doctor_id && errors.doctor_id ? (<div>{errors.doctor_id}</div>) : null}
                </div>

                <div className="field">
                    <label>Patient:</label>
                    <select name="patient_id" placeholder="patients" defaultValue={""} value={values.patient_id} onChange={handleChange} required>
                        <option value="" disabled>Select Patient</option>
                        {patients.map(patient => <option kay={patient.id} value={patient.id}>{patient.last_name}, {patient.first_name}</option>)}
                    </select>
                    {touched.patient_id && errors.patient_id ? (<div>{errors.patient_id}</div>) : null}
                </div>

                <div className="field">
                    <label>Reason:</label>
                    <input type="text" placeholder="Reason" name="reason" value={values.reason} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Notes:</label>
                    <textarea placeholder="N/a if none" name="notes" value={values.notes} onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className="btn">Add</button>
                <button type="button" className="btn cancel" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    )
}

export default AppointmentForm;