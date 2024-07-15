import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import Calendar from "./Calendar";

function AppointmentDetails() {
    const {appointments, setAppointments, doctors} = useOutletContext();
    const {id} = useParams();
    const [appointment, setAppointment] = useState();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const [dateObj, setDateObj] = useState(dayjs(new Date()))
    
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
        setDateObj(dateObj)
        setDate(dateObj.toISOString().slice(0,10))
        setHour(`${dateObj.$H > 12 ? (dateObj.$H).toString()-12 : (dateObj.$H).toString()}:${dateObj.$m.toString().padStart(2, '0')}`)
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
                <div>
                    <h3>Appointment Overview</h3>
                    <h3>{appointment.date} {generateTime(appointment.hour)}</h3>
                    <p>Reason: {appointment.reason}</p>
                    <p>Doctor: {appointment.doctor.last_name}, {appointment.doctor.first_name}</p>
                    <p>Patient: {appointment.patient.last_name}, {appointment.patient.first_name}</p>
                    <p>Notes: {appointment.notes}</p>
                </div>
                <button className="open-button" onClick={handleToggleForm}>Update</button>
                <button onClick={handleDelete}>Delete</button>
                {isUpdating ? (
                    <div className="form-popup" id="updateForm">
                        <form className="form-container" onSubmit={handleUpdate}>
                            <label>Date & Time</label>
                            <Calendar dateObj={dateObj} onDateChange={handleDateChange}/>

                            <label>Doctor</label>
                            <select name="doctor" placeholder="doctors" defaultValue={""} onChange={handleFormInput} required>
                                <option value="" disabled>Select Doctor</option>
                                {doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                            </select>

                            <label>Reason</label>
                            <input type="text" placeholder="Reason" name="reason" value={reason} onChange={handleFormInput} required/>

                            <label>Notes</label>
                            <input type="text" placeholder="Notes" name="notes" value={notes} onChange={handleFormInput} required/>

                            <button type="submit" className="btn">Confirm</button>
                            <button type="button" className="btn cancel" onClick={handleToggleForm}>Cancel</button>
                        </form>
                    </div>
                ) : ("")}
            </>
        )
    }
}

export default AppointmentDetails