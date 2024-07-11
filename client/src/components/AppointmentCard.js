import { useNavigate } from "react-router-dom";

function AppointmentCard({appointment}) {
    const doctor = appointment.doctor;
    const patient = appointment.patient;
    const navigate = useNavigate();

    function generateTime(hour) {

        if (parseInt(hour) <= 12) {
            return hour + ":00AM"
        } else {
            return hour - 12 + ":00PM"
        }
    }

    const handleUpdate = (id) => {
        navigate(`/appointments/${id}`)
    }

    return(
        <div>
            <h3>{appointment.date} {generateTime(appointment.hour)}</h3>
            <button onClick={() => handleUpdate(appointment.id)}>Overview</button>
            <p>Doctor: {doctor.last_name}, {doctor.first_name}</p>
            <p>Patient: {patient.last_name}, {patient.first_name}</p>
            <p>Reason: {appointment.reason}</p>
        </div>
    )
}

export default AppointmentCard