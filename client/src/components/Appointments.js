import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";

function Appointments() {
    const {appointments, setAppointments} = useOutletContext();
    const {patients} = useOutletContext();
    const {doctors} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Post form states
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
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
        if(field === "date") {
            setDate(input)
        } else if(field === "hour") {
            setHour(input)
        } else if(field === "reason") {
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
            clearForm()
        })
    }

    function clearForm() {
        setDate("")
        setHour("")
        setReason("")
    }  

    return(
        <>
        <h1>Appointments</h1>
        <button className="open-button" onClick={handleToggleForm}>Schedule New Appointment</button>
        {isUpdating ? (
            <div className="form-popup" id="appointmentForm" onSubmit={handleAddSubmit}>
            <form class="form-container">
                <label>Date</label>
                <input type="text" placeholder="Date" name="date" value={date} onChange={handleFormInput} required/>

                <label>Hour</label>
                <input type="text" placeholder="Hour" name="hour" value={hour} onChange={handleFormInput} required/>

                <label>Doctor</label>
                <select name="doctor" onChange={handleFormInput} required>
                    <option value="" disabled selected>Select Doctor</option>
                    {doctors.map(doctor => <option value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                </select>

                <label>Patient</label>
                <select name="patient" placeholder="patients" onChange={handleFormInput} required>
                    <option value="" disabled selected>Select Patient</option>
                    {patients.map(patient => <option value={patient.id}>{patient.last_name}, {patient.first_name}</option>)}
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