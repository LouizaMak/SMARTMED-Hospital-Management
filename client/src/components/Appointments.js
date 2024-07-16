import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import dayjs from 'dayjs';
import Calendar from "./Calendar";
import AppointmentCard from "./AppointmentCard";

function Appointments() {
    const {appointments, setAppointments} = useOutletContext();
    const {patients} = useOutletContext();
    const {doctors} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Available doctors per appointment date and time
    const [availableDoctors, setAvailableDoctors] = useState(doctors)

    //Post form states
    const [dateObj, setDateObj] = useState(dayjs(new Date()))
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("")
    const [reason, setReason] = useState("");
    const [patient, setPatient] = useState("");
    const [doctor, setDoctor] = useState("");

    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
    }

    //Form data
    function handleFormInput(event) {
        const field = event.target.name;
        let input = event.target.value;
        if(field === "reason") {
            setReason(input)
        } else if(field === "patient") {
            setPatient(input)
        } else {
            setDoctor(input)
        }
    }

    function handleAddSubmit(event) {
        event.preventDefault()
        fetch("http://127.0.0.1:5555/appointments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                hour: hour,
                reason: reason,
                patient_id: patient,
                doctor_id: doctor
            })
        })
        .then(res => res.json())
        .then(newAppointment => {
            setAppointments([...appointments, newAppointment])
            setReason("")
            handleToggleForm()
        })
    }

    //Passed to Calendar component
    function handleDateChange(dateObj) {
        const newDate = dateObj.toISOString().slice(0,10)
        const newHour = `${dateObj.$H}:${dateObj.$m.toString().padStart(2, '0')}`
        setDateObj(dateObj)
        setDate(newDate)
        setHour(newHour)
        checkDoctors(newDate, newHour)
    }

    function checkDoctors(date, hour) {
        const filteredDoctors = doctors.filter(doctor => {
            return doctor.appointments.every(appointment => 
                appointment.date !== date || appointment.hour !== hour
            )})
        setAvailableDoctors(filteredDoctors)
    }

    return(
        <>
        <h1>Appointments</h1>
        <button className="open-button" onClick={handleToggleForm}>Schedule New Appointment</button>
        {isUpdating ? (
            <div className="form-popup" id="appointmentForm">
                <form className="form-container" onSubmit={handleAddSubmit}>
                    <label>Date & Time</label>
                    <Calendar dateObj={dateObj} onDateChange={handleDateChange}/>
                
                    <label>Doctor</label>
                    <select name="doctor" placeholder="doctors" defaultValue={""} onChange={handleFormInput} required>
                        <option value="" disabled>Select Doctor</option>
                        {availableDoctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                    </select>

                    <label>Patient</label>
                    <select name="patient" placeholder="patients" defaultValue={""} onChange={handleFormInput} required>
                        <option value="" disabled>Select Patient</option>
                        {patients.map(patient => <option kay={patient.id} value={patient.id}>{patient.last_name}, {patient.first_name}</option>)}
                    </select>
        
                    <label>Reason</label>
                    <input type="text" placeholder="Reason" name="reason" value={reason} onChange={handleFormInput} required/>

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={handleToggleForm}>Cancel</button>
                </form>
        </div>
        ) : ("")}
        {appointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
        </>
    )
}

export default Appointments