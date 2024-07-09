import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";

function Appointments() {
    const {patients} = useOutletContext();
    const {doctors} = useOutletContext();
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [reason, setReason] = useState("");
    const [patient, setPatient] = useState("");
    const [doctor, setDoctor] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5555/appointments")
        .then(res => res.json())
        .then(appointments => setAppointments(appointments))
      }, [])

    //Pop-up form
    useEffect(() => {
        handleCloseForm()
    }, [])

    function handleOpenForm() {
        document.getElementById("appointmentForm").style.display = "block";
    }

    function handleCloseForm() {
        document.getElementById("appointmentForm").style.display = "none";
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

    console.log(patients[0])

    return(
        <>
        <h1>Appointments</h1>
        <button className="open-button" onClick={handleOpenForm}>Add New Appointment</button>
        <div className="form-popup" id="appointmentForm" onSubmit={handleAddSubmit}>
            <form class="form-container">
                <label>Date</label>
                <input type="text" placeholder="Date" name="date" value={date} onChange={handleFormInput} required/>

                <label>Hour</label>
                <input type="text" placeholder="Hour" name="hour" value={hour} onChange={handleFormInput} required/>

                <label>Doctor</label>
                <select name="doctor" onChange={handleFormInput} required>
                    {doctors.map(doctor => <option value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                </select>

                <label>Patient</label>
                <select name="patient" onChange={handleFormInput} required>
                    {patients.map(patient => <option value={patient.id}>{patient.last_name}, {patient.first_name}</option>)}
                </select>
    
                <label>Reason</label>
                <input type="text" placeholder="Reason" name="reason" value={reason} onChange={handleFormInput} required/>

                <button type="submit" className="btn">Add</button>
                <button type="button" className="btn cancel" onClick={handleCloseForm}>Cancel</button>
            </form>
        </div>
        {appointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
        </>
    )
}

export default Appointments