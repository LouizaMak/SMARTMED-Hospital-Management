import { useNavigate } from "react-router-dom";
import './pageStyle.css';

function AppointmentCard({appointment}) {
    const doctor = appointment.doctor;
    const patient = appointment.patient;
    const navigate = useNavigate();

    function generateTime(time) {
        let timeParts = time.split(':')
        const hour = parseInt(timeParts[0])
        const period = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${timeParts[1]} ${period}`
    }

    const handleUpdate = (id) => {
        navigate(`/appointments/${id}`)
    }

    return(
        <div className="card">
            <div className="date-overview">
                <h3>{appointment.date} {generateTime(appointment.hour)}</h3>
                <button className="overview-btn" onClick={() => handleUpdate(appointment.id)}>Overview</button>
            </div>
            <p>Doctor: {doctor.last_name}, {doctor.first_name}</p>
            <p>Patient: {patient.last_name}, {patient.first_name}</p>
            <p>Reason: {appointment.reason}</p>
        </div>
    )
}

export default AppointmentCard