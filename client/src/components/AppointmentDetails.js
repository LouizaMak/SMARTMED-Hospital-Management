import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import UpdateAppointmentForm from "./UpdateAppointmentForm";
import "./overviewStyle.css";

function AppointmentDetails() {
    const {appointments, setAppointments, doctors} = useOutletContext();
    const {id} = useParams();
    const [appointment, setAppointment] = useState();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/appointments/${id}`)
        .then(res => res.json())
        .then(appointment => {
            setAppointment(appointment)
        })
    }, [])

    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
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

    function handleAppointmentsUpdate(newAppointments) {
        setAppointments(newAppointments)
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
                        {isUpdating ? <UpdateAppointmentForm 
                            appointment={appointment} 
                            setAppointment={setAppointment}
                            doctors={doctors} 
                            onToggleForm={handleToggleForm}
                            appointments={appointments}
                            onAppointmentsUpdate={handleAppointmentsUpdate}
                            id = {id}
                            /> : ("")}
                    </div>
                </div>
            </>
        )
    }
}

export default AppointmentDetails