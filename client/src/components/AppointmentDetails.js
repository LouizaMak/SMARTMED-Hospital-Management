import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import Calendar from "./Calendar";
import "./overviewStyle.css";

function AppointmentDetails() {
    const {appointments, setAppointments, doctors} = useOutletContext();
    const {id} = useParams();
    const [appointment, setAppointment] = useState();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const [dateObj, setDateObj] = useState(dayjs(new Date()))

    //Available doctors per appointment date and time
    const [availableDoctors, setAvailableDoctors] = useState(doctors)
    
    //Update form states
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("")
    const [reason, setReason] = useState("")
    const [doctor, setDoctor] = useState("")
    const [notes, setNotes] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/appointments/${id}`)
        .then(res => res.json())
        .then(appointment => {
            setAppointment(appointment)
            setDate(appointment.date)
            setHour(appointment.hour)
            setReason(appointment.reason)
            setNotes(appointment.notes)
        })
    }, [])

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
        } else if(field === "notes") {
            setNotes(input)
        } else {
            setDoctor(input)
        }
    }

    function handleUpdate(event) {
        event.preventDefault();
        fetch(`http://127.0.0.1:5555/appointments/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: date,
                hour: hour,
                reason: reason,
                doctor_id: doctor
            })
        })
        .then(res => res.json())
        .then(updatedAppointment => {
            appointments.map(appointment => {
                if(appointment.id === updatedAppointment.id) {
                    return updatedAppointment
                } else return appointment
            })
            setAppointment(updatedAppointment)
        })
        handleToggleForm()
    }

    function handleDelete() {
        fetch(`http://127.0.0.1:5555/appointments/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(deletedAppointment => {
            const updatedAppointments = appointments.filter(appointment => appointment.id !== deletedAppointment.id)
            setAppointments(updatedAppointments)
        })
        .then(navigate('/appointments'))
    }

    function generateTime(time) {
        let timeParts = time.split(':')
        const hour = parseInt(timeParts[0])
        const period = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${timeParts[1]} ${period}`
    }

    if (!appointment) {
        return <p>Loading...</p>
    } else {
        return (
            <>
                <div className="overview-title">
                    <h1>Appointment Overview</h1>
                    <button className="overview-open-button" onClick={handleToggleForm}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div className="box">
                    <div className="box-content">
                        <div>
                            <h3>{appointment.date} {generateTime(appointment.hour)}</h3>
                            <p>Patient: {appointment.patient.last_name}, {appointment.patient.first_name}</p>
                            <p>Reason: {appointment.reason}</p>
                            <p>Doctor: {appointment.doctor.last_name}, {appointment.doctor.first_name}</p>
                            <p>Notes: {appointment.notes}</p>
                        </div>
                        {isUpdating ? (
                            <div className="form-popup" id="updateForm">
                                <h2>Updating Appointment Form</h2>
                                <form className="form-container" onSubmit={handleUpdate}>
                                    <div className="field">
                                        <label>Date & Time:</label>
                                        <Calendar dateObj={dateObj} onDateChange={handleDateChange}/>
                                    </div>

                                    <div className="field">
                                        <label>Doctor:</label>
                                        <select name="doctor" placeholder="doctors" defaultValue={""} onChange={handleFormInput} required>
                                            <option value="" disabled>Select Doctor</option>
                                            {availableDoctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                                        </select>
                                    </div>

                                    <div className="field">
                                        <label>Reason:</label>
                                        <input type="text" placeholder="Reason" name="reason" value={reason} onChange={handleFormInput} required/>
                                    </div>

                                    <div className="field">
                                        <label>Notes:</label>
                                        <textarea placeholder="N/a if none" name="notes" value={notes} onChange={handleFormInput} required></textarea>
                                    </div>

                                    <button type="submit" className="btn">Confirm</button>
                                    <button type="button" className="btn cancel" onClick={handleToggleForm}>Cancel</button>
                                </form>
                            </div>
                        ) : ("")}
                    </div>
                </div>
            </>
        )
    }
}

export default AppointmentDetails