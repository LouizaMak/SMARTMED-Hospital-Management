import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function AppointmentDetails() {
    // Need to pass appointments somehow
    const {appointments, setAppointments} = useOutletContext();
    const {id} = useParams();
    const [appointment, setAppointment] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/appointments/${id}`)
        .then(res => res.json())
        .then(appointment => setAppointment(appointment))
    }, [])

    function generateTime(hour) {

        if (parseInt(hour) <= 12) {
            return hour + ":00AM"
        } else {
            return hour - 12 + ":00PM"
        }
    }

    function handleDelete() {
        fetch(`http://127.0.0.1:5555/appointments/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(deletedAppointment => {
            console.log(`DeletedApp: ${deletedAppointment}`)
            const updatedAppointments = appointments.filter(appointment => appointment.id !== deletedAppointment.id)
            setAppointments(updatedAppointments)
        })
        .then(navigate('/appointments'))
    }

    if (!appointment) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                <h3>Appointment Overview</h3>
                <button onClick={handleDelete}>Delete</button>
                <h3>{appointment.date} {generateTime(appointment.hour)}</h3>
                <p>Reason: {appointment.reason}</p>
                <p>Doctor: {appointment.doctor.last_name}, {appointment.doctor.first_name}</p>
                <p>Patient: {appointment.patient.last_name}, {appointment.patient.first_name}</p>
            </div>
        )
    }
}

export default AppointmentDetails